import { Question } from './types'

const option=()=>[
    {
        label:'非常符合',
        score:5
    },
    {
        label:'比较符合',
        score:4
    },
    {
        label:'一般',
        score:3
    },
    {
        label:'不太符合',
        score:2
    },
    {
        label:'完全不符合',
        score:1
    }
]

export const questionBank:Question[]=[

    {
        id:'Q1',
        dimension:'communication',
        title:'面对陌生人时愿意主动交流',
        options:option()
    },

    {
        id:'Q2',
        dimension:'stress',
        title:'高压情况下仍能保持效率',
        options:option()
    },

    {
        id:'Q3',
        dimension:'execution',
        title:'接到任务后立即开始执行',
        options:option()
    },

    {
        id:'Q4',
        dimension:'teamwork',
        title:'乐于帮助团队成员',
        options:option()
    },

    {
        id:'Q5',
        dimension:'learning',
        title:'愿意持续学习新知识',
        options:option()
    },

    {
        id:'Q6',
        dimension:'communication',
        title:'表达观点时逻辑清晰',
        options:option()
    },

    {
        id:'Q7',
        dimension:'stress',
        title:'面对批评能快速调整',
        options:option()
    },

    {
        id:'Q8',
        dimension:'execution',
        title:'按计划推进工作',
        options:option()
    },

    {
        id:'Q9',
        dimension:'teamwork',
        title:'能主动协调资源',
        options:option()
    },

    {
        id:'Q10',
        dimension:'learning',
        title:'善于总结经验',
        options:option()
    }

]