import {
    Card,
    Typography,
    Button,
    Space,
    Result,
    Divider, List,
} from 'antd';

import {
    storage,
} from './storage';

import {
    calcResult,
} from './score';

const mbtiMap:Record<
    string,
    {

        title:string;

        desc:string;

        advantage:string[];

        risk:string[];

        job:string[];

    }

>={

    INTJ:{

        title:'建筑师',

        desc:
            '独立、理性、战略导向，喜欢长期规划。',

        advantage:[

            '擅长分析',

            '目标明确',

            '学习能力强',

        ],

        risk:[

            '容易显得冷淡',

            '要求过高',

        ],

        job:[

            '技术',

            '产品',

            '咨询',

        ],

    },

    INTP:{

        title:'逻辑学家',

        desc:
            '喜欢研究问题与抽象模型。',

        advantage:[

            '逻辑能力强',

            '创造力高',

        ],

        risk:[

            '容易拖延',

            '执行不足',

        ],

        job:[

            '研发',

            '算法',

        ],

    },

    ENTJ:{

        title:'指挥官',

        desc:
            '目标驱动，擅长组织资源。',

        advantage:[

            '领导能力强',

            '决策果断',

        ],

        risk:[

            '控制欲偏强',

        ],

        job:[

            '管理',

            '创业',

        ],

    },

    ENTP:{

        title:'辩论家',

        desc:
            '创新、表达能力强。',

        advantage:[

            '想法丰富',

            '适应快',

        ],

        risk:[

            '容易分散',

        ],

        job:[

            '市场',

            '产品',

        ],

    },

    INFJ:{

        title:'提倡者',

        desc:
            '重视意义和价值。',

        advantage:[

            '洞察力强',

            '有责任感',

        ],

        risk:[

            '压力内耗',

        ],

        job:[

            '教育',

            '咨询',

        ],

    },

    INFP:{

        title:'调停者',

        desc:
            '理想主义且关注价值观。',

        advantage:[

            '共情能力强',

        ],

        risk:[

            '容易犹豫',

        ],

        job:[

            '设计',

            '写作',

        ],

    },

    ENFJ:{

        title:'主人公',

        desc:
            '善于激励团队。',

        advantage:[

            '领导与沟通',

        ],

        risk:[

            '容易过度付出',

        ],

        job:[

            '人力',

            '培训',

        ],

    },

    ENFP:{

        title:'竞选者',

        desc:
            '热情开放，善于连接人与创意。',

        advantage:[

            '感染力强',

        ],

        risk:[

            '容易三分钟热度',

        ],

        job:[

            '运营',

            '市场',

        ],

    },

    ISTJ:{

        title:'物流师',

        desc:
            '可靠、稳定、重规则。',

        advantage:[

            '执行稳定',

        ],

        risk:[

            '抗变化弱',

        ],

        job:[

            '财务',

            '项目管理',

        ],

    },

    ISFJ:{

        title:'守卫者',

        desc:
            '务实且乐于支持他人。',

        advantage:[

            '责任心强',

        ],

        risk:[

            '容易压抑自己',

        ],

        job:[

            '行政',

            'HR',

        ],

    },

    ESTJ:{

        title:'总经理',

        desc:
            '高执行、组织能力强。',

        advantage:[

            '推动能力强',

        ],

        risk:[

            '容易强势',

        ],

        job:[

            '管理',

        ],

    },

    ESFJ:{

        title:'执政官',

        desc:
            '关注关系与团队氛围。',

        advantage:[

            '协调能力强',

        ],

        risk:[

            '容易迎合',

        ],

        job:[

            '服务',

        ],

    },

    ISTP:{

        title:'鉴赏家',

        desc:
            '务实、冷静、解决问题能力强。',

        advantage:[

            '动手能力强',

        ],

        risk:[

            '表达较少',

        ],

        job:[

            '工程',

        ],

    },

    ISFP:{

        title:'探险家',

        desc:
            '自由、审美感强。',

        advantage:[

            '适应性高',

        ],

        risk:[

            '长期规划弱',

        ],

        job:[

            '设计',

        ],

    },

    ESTP:{

        title:'企业家',

        desc:
            '行动快，善于抓机会。',

        advantage:[

            '执行力高',

        ],

        risk:[

            '耐心不足',

        ],

        job:[

            '销售',

        ],

    },

    ESFP:{

        title:'表演者',

        desc:
            '热情、享受互动。',

        advantage:[

            '表达能力强',

        ],

        risk:[

            '计划性不足',

        ],

        job:[

            '公关',

        ],

    },

};

export default function ResultPage(){

    const cache=
        storage.get();

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

    const result=

        calcResult({

            questions:
            cache.questions,

            answers:
            cache.answers,

            startTime:
            cache.startTime,

            submitTime:
            cache.submitTime,

        });

    const info=

        mbtiMap[
            result.type
            ];

    const reset=()=>{

        storage.remove();

        window.location.assign(
            '/mbti',
        );

    };

    return(

        <div

            style={

                {

                    maxWidth:
                        900,

                    margin:
                        '40px auto',

                }

            }

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

                        MBTI测试结果

                    </Typography.Title>

                    <Card>

                        <Typography.Title
                            level={1}
                        >

                            {
                                result.type
                            }

                        </Typography.Title>

                        <Typography.Title
                            level={3}
                        >

                            {
                                info.title
                            }

                        </Typography.Title>

                        <p>

                            {
                                info.desc
                            }

                        </p>

                    </Card>

                    <Card>
                        <List
                            itemLayout="horizontal"
                            dataSource={[
                                {title:'优势',content:info.advantage},
                                {title:'潜在挑战',content:info.risk},
                                {title:'适合方向',content:info.job},
                            ]}
                            renderItem={(item, index) => (
                                <List.Item>
                                    <List.Item.Meta
                                        // avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                        title={item.title}
                                        description={item.content.join('、')}
                                    />
                                </List.Item>
                            )}
                        />

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