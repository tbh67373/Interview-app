import {
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import {
    Card,
    Form,
    Radio,
    Space,
    Button,
    Typography,
    message,
    Modal,
} from 'antd';

import {
    questionBank,
} from './questionBank';

import {
    storage,
} from './storage';

import {
    randomQuestions,
} from './utils';

import {
    Question,
} from './types';

const TOTAL=
    30*
    60;

const options=[

    {
        label:'非常不同意',
        value:1,
    },

    {
        label:'不同意',
        value:2,
    },

    {
        label:'一般',
        value:3,
    },

    {
        label:'同意',
        value:4,
    },

    {
        label:'非常同意',
        value:5,
    },

];

export default function DiscTest(){

    const[
        form
    ]=
        Form.useForm();

    const[
        questions,
        setQuestions
    ]=
        useState<
            Question[]
        >(
            [],
        );

    const[
        left,
        setLeft
    ]=
        useState(
            TOTAL,
        );

    const[
        loading,
        setLoading
    ]=
        useState(
            false,
        );

    const timer:any =
        useRef<
            ReturnType<
                typeof setInterval
            > | null
        >(
            null,
        );

    const submitted=
        useRef(
            false,
        );

    const formatTime=(
        s:number,
    )=>{

        const mm=
            String(
                Math.floor(
                    s/
                    60,
                ),
            )
                .padStart(
                    2,
                    '0',
                );

        const ss=
            String(
                s%
                60,
            )
                .padStart(
                    2,
                    '0',
                );

        return `${mm}:${ss}`;

    };

    const init=()=>{

        const cache=
            storage.get();

        if(
            cache?.submitted
        ){

            return;

        }

        if(
            cache
        ){

            setQuestions(
                cache.questions,
            );

            form.setFieldsValue(
                cache.answers,
            );

            const diff=
                Math.floor(
                    (
                        Date.now()
                        -
                        cache.startTime
                    )
                    /
                    1000,
                );

            setLeft(
                Math.max(
                    TOTAL-
                    diff,
                    0,
                ),
            );

            return;

        }

        const selected=
            randomQuestions(
                questionBank,
            );

        storage.set({

            questions:selected,

            answers:{},

            startTime:
                Date.now(),

            submitted:false,

        });

        setQuestions(
            selected,
        );

    };

    useEffect(
        ()=>{

            init();

        },
        [],
    );

    useEffect(
        ()=>{

            if(
                !questions
                    .length
            ){

                return;

            }

            timer.current=
                setInterval(
                    ()=>{

                        setLeft(
                            (
                                v,
                            )=>{

                                const next=
                                    v-
                                    1;

                                if(
                                    next<=0
                                ){

                                    submit(
                                        true,
                                    );

                                    return 0;

                                }

                                return next;

                            },
                        );

                    },
                    1000,
                );

            return()=>{

                if (
                    timer.current
                ) {

                    clearInterval(
                        timer.current,
                    );

                }

            };

        },
        [
            questions,
        ],
    );

    const saveAnswer=(

        changed:any,

        all:any,

    )=>{

        const cache=
            storage.get();

        storage.set({

            ...cache,

            answers:all,

        });

    };

    const submit = async (
        auto = false,
    ) => {

        if (
            submitted.current
        ) {

            return;

        }

        submitted.current =
            true;

        setLoading(
            true,
        );

        try {

            let values;

            try {

                values =
                    await form.validateFields();

            } catch {

                if (
                    auto
                ) {

                    values =
                        form.getFieldsValue();

                } else {

                    submitted.current =
                        false;

                    return;

                }

            }

            const cache =
                storage.get();

            storage.set({

                ...cache,

                answers:
                values,

                submitted:
                    true,

                submitTime:
                    Date.now(),

            });

            clearInterval(
                timer.current!,
            );

            message.success(
                auto
                    ? '时间到自动提交'
                    : '提交成功',
            );

            setTimeout(
                () => {

                    window.location.assign(
                        '/result',
                    );

                },
                100,
            );

        } finally {

            setLoading(
                false,
            );

        }

    };

    const values =
        Form.useWatch(
            [],
            form,
        );

    const answered =
        questions
            .filter(
                (
                    item,
                ) => {

                    const value =
                        values?.[
                            String(
                                item.id,
                            )
                            ];

                    return (
                        value !==
                        undefined &&
                        value !==
                        null
                    );

                },
            )
            .length;

    return(

        <div
            style={{

                padding:40,

                maxWidth:
                    900,

                margin:
                    '0 auto',

            }}
        >

            <Card>

                <Space
                    direction="vertical"
                    style={{
                        width:
                            '100%',
                    }}
                >

                    <Typography.Title
                        level={3}
                    >

                        DISC性格测试

                    </Typography.Title>

                    <div>

                        剩余时间：

                        <b>

                            {
                                formatTime(
                                    left,
                                )
                            }

                        </b>

                    </div>

                    <div>

                        已完成：

                        {
                            answered
                        }

                        /

                        30

                    </div>

                    <Form

                        form={
                            form
                        }

                        layout="vertical"

                        onValuesChange={
                            saveAnswer
                        }

                    >

                        {

                            questions
                                .map(
                                    (
                                        item,
                                        index,
                                    )=>(

                                        <Card

                                            key={
                                                item.id
                                            }

                                            style={{
                                                marginBottom:
                                                    20,
                                            }}

                                        >

                                            <Form.Item

                                                label={`${
                                                    index+
                                                    1
                                                }. ${
                                                    item.title
                                                }`}

                                                name={
                                                    String(
                                                        item.id,
                                                    )
                                                }

                                                rules={[

                                                    {

                                                        required:true,

                                                        message:
                                                            '请选择',

                                                    },

                                                ]}

                                            >

                                                <Radio.Group>

                                                    <Space
                                                        size={"large"}
                                                    >

                                                        {

                                                            options
                                                                .map(
                                                                    (
                                                                        v,
                                                                    )=>(

                                                                        <Radio

                                                                            key={
                                                                                v.value
                                                                            }

                                                                            value={
                                                                                v.value
                                                                            }

                                                                        >

                                                                            {
                                                                                v.label
                                                                            }

                                                                        </Radio>

                                                                    ),

                                                                )

                                                        }

                                                    </Space>

                                                </Radio.Group>

                                            </Form.Item>

                                        </Card>

                                    ),

                                )

                        }

                        <Button
                            type="primary"
                            block
                            loading={
                                loading
                            }
                            disabled={
                                answered !==
                                questions.length
                            }
                            onClick={() =>
                                submit()
                            }
                        >

                            提交

                        </Button>

                    </Form>

                </Space>

            </Card>

        </div>

    );

}