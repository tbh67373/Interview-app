import {
    Card,
    Form,
    Radio,
    Button,
    Pagination,
    message,
    Statistic,
    Modal
}
    from 'antd'

import {
    useEffect,
    useState,
    useRef
}
    from 'react'

import { questionBank } from './questionBank'
import { calcScore } from './score'

const { Countdown }=Statistic

const PAGE_SIZE=5

const TEST_MINUTES=30

const KEY='personality_session'

const ANSWER_KEY='personality_answers'

const SUBMIT_KEY='personality_submitted'

function createSession(candidateId:string){

    const questions=
        [...questionBank]
            .sort(
                ()=>Math.random()-0.5
            )
            .slice(0,30)

    const now=Date.now()

    return{

        candidateId,

        questions,

        startTime:now,

        expireTime:
            now+
            TEST_MINUTES*
            60*
            1000

    }

}

export default()=>{

    const [form]=
        Form.useForm()

    const [
        questions,
        setQuestions
    ]=useState<any[]>([])

    const [
        page,
        setPage
    ]=useState(1)

    const[
        expireTime,
        setExpireTime
    ]=useState(0)

    const submitted=
        useRef(false)

    const candidateId:any=
        new URLSearchParams(
            window.location.search
        )
            .get(
                'id'
            )

    useEffect(()=>{

        if(
            localStorage.getItem(
                SUBMIT_KEY
            )
            ===candidateId
        ){

            Modal.info({

                title:'已完成测试',

                content:'不能重复提交'

            })

            return

        }

        let session:any=
            localStorage.getItem(
                KEY
            )

        if(session){

            session=
                JSON.parse(
                    session
                )

            if(
                session.candidateId===
                candidateId
            ){

                setQuestions(
                    session.questions
                )

                setExpireTime(
                    session.expireTime
                )

            }

        }else{

            const data=
                createSession(
                    candidateId
                )

            localStorage.setItem(
                KEY,
                JSON.stringify(
                    data
                )
            )

            setQuestions(
                data.questions
            )

            setExpireTime(
                data.expireTime
            )

        }

        const cache=
            localStorage.getItem(
                ANSWER_KEY
            )

        if(cache){

            form.setFieldsValue(
                JSON.parse(cache)
            )

        }

    },[])

    const saveDraft=
        ()=>{

            const values=
                form.getFieldsValue(
                    true
                )

            localStorage.setItem(
                ANSWER_KEY,

                JSON.stringify(
                    values
                )

            )

        }

    const submit=
        async(
            auto=false
        )=>{

            if(
                submitted.current
            ){

                return

            }

            submitted.current=true

            const values=
                form.getFieldsValue(
                    true
                )

            const result=
                calcScore(
                    values
                )

            await fetch(
                '/api/test',
                {

                    method:'POST',

                    headers:{
                        'Content-Type':
                            'application/json'
                    },

                    body:
                        JSON.stringify({

                            candidateId,

                            answers:values,

                            ...result,

                            autoSubmit:auto

                        })

                }

            )

            localStorage.setItem(
                SUBMIT_KEY,
                candidateId!
            )

            localStorage.removeItem(
                KEY)

            localStorage.removeItem(
                ANSWER_KEY)

            message.success(

                auto
                    ?
                    '时间结束，已自动提交'
                    :
                    '提交成功'

            )

            window.location.href=
                '/result'

        }

    const timeout=
        ()=>{

            Modal.warning({

                title:'时间到',

                content:'系统自动提交'

            })

            submit(
                true
            )

        }

    const start=
        (page-1)
        *
        PAGE_SIZE

    const current=
        questions.slice(
            start,
            start+
            PAGE_SIZE
        )

    return(

        <Card>

            <div
                style={{
                    display:'flex',
                    justifyContent:
                        'space-between'
                }}
            >

                <h2>

                    性格测试

                </h2>

                {
                    expireTime>0&&(

                        <Countdown

                            value={
                                expireTime
                            }

                            onFinish={
                                timeout
                            }

                        />

                    )

                }

            </div>

            <Form

                form={form}

                layout='vertical'

                onValuesChange={
                    saveDraft
                }

            >

                {

                    current.map(
                        (item)=>(
                            <Form.Item

                                key={
                                    item.id
                                }

                                name={
                                    item.id
                                }

                                label={
                                    item.title
                                }

                            >

                                <Radio.Group>

                                    {

                                        item.options.map(
                                            (op:any)=>(

                                                <Radio

                                                    key={
                                                        op.score
                                                    }

                                                    value={
                                                        op.score
                                                    }

                                                >

                                                    {
                                                        op.label
                                                    }

                                                </Radio>

                                            )

                                        )

                                    }

                                </Radio.Group>

                            </Form.Item>

                        )

                    )

                }

            </Form>

            <Pagination

                current={
                    page
                }

                pageSize={
                    PAGE_SIZE
                }

                total={
                    30
                }

                onChange={
                    setPage
                }

            />

            <div
                style={{
                    marginTop:20
                }}
            >

                <Button

                    type='primary'

                    onClick={
                        ()=>submit()
                    }

                >

                    提交

                </Button>

            </div>

        </Card>

    )

}