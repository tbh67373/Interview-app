import {

    Card,

    Button,

    Typography,

    Progress,

    Space,

    Result,

} from 'antd';

import {

    storage,

} from './storage';

import {

    calcResult,

} from './score';

export default function ResultPage(){

    const cache=
        storage.get();

    const result:any=
        cache
            ? calcResult({

                questions:
                cache.questions,

                answers:
                cache.answers,

                startTime:
                cache.startTime,

                submitTime:
                cache.submitTime,

            })
            : null;

    if(
        !cache
    ){

        return(

            <Result

                status="404"

                title="暂无结果"

            />

        );

    }

    const reset =
        () => {

            storage.remove();

            window.location.href =
                '/test';

        };

    const list=[

        {

            name:'支配(D)',

            value:
            result.percent.D,

            desc:
                '结果驱动',

        },

        {

            name:'影响(I)',

            value:
            result.percent.I,

            desc:
                '表达沟通',

        },

        {

            name:'稳定(S)',

            value:
            result.percent.S,

            desc:
                '关系支持',

        },

        {

            name:'谨慎(C)',

            value:
            result.percent.C,

            desc:
                '规则分析',

        },

    ];

    return(

        <div

            style={{

                maxWidth:
                    800,

                margin:
                    '40px auto',

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

                    <Typography.Title>

                        DISC测试结果

                    </Typography.Title>

                    <Card>

                        <Typography.Title
                            level={2}
                        >

                            {
                                result.code
                            }

                        </Typography.Title>

                        <div>

                            人格：

                            {
                                result.name
                            }

                        </div>

                        <div>

                            主人格：

                            {
                                result.primary
                            }

                        </div>

                        <div>

                            辅助人格：

                            {
                                result.secondary
                            }

                        </div>

                    </Card>

                    {

                        list.map(
                            (
                                item,
                            )=>(

                                <div
                                    key={
                                        item.name
                                    }
                                >

                                    <div>

                                        {
                                            item.name
                                        }

                                        （
                                        {
                                            item.desc
                                        }
                                        ）

                                    </div>

                                    <Progress

                                        percent={
                                            item.value
                                        }

                                    />

                                </div>

                            ),

                        )

                    }

                    <Card>

                        <Typography.Title
                            level={4}
                        >

                            结果解读

                        </Typography.Title>

                        <p>

                            D高：
                            偏目标导向、
                            执行快。

                        </p>

                        <p>

                            I高：
                            表达能力、
                            感染力强。

                        </p>

                        <p>

                            S高：
                            稳定、
                            耐心、
                            合作。

                        </p>

                        <p>

                            C高：
                            严谨、
                            重规则。

                        </p>

                    </Card>

                    <Button

                        block

                        type="primary"

                        onClick={
                            reset
                        }

                    >

                        重新测试

                    </Button>

                </Space>

            </Card>

        </div>

    );

}