import {
    SubmitData,
    Dimension,
} from './types';

type ScoreMap=
    Record<
        Dimension,
        number
    >;

const typeMap:any={

    DI:'推动者',

    DC:'执行者',

    DS:'组织者',

    ID:'表达者',

    IS:'协调者',

    IC:'创意者',

    SD:'守护者',

    SC:'支持者',

    CD:'管理者',

    CI:'分析者',

    CS:'专家型',

};

function convert(

    value:number,

    count:number,

){

    const min=
        count;

    const max=
        count*
        5;

    return Number(

        (

            (
                value-
                min
            )

            /

            (
                max-
                min
            )

            *
            100

        )

            .toFixed(
                0,
            ),

    );

}

export function calcResult(

    data:SubmitData,

){

    const score:ScoreMap={

        D:0,

        I:0,

        S:0,

        C:0,

    };

    const counter={

        D:0,

        I:0,

        S:0,

        C:0,

    };

    data.questions
        .forEach(
            (
                q,
            )=>{

                counter[
                    q.dimension
                    ]++;

                let v=

                    Number(

                        data
                            .answers[
                            q.id
                            ],

                    );

                if(
                    !v
                ){

                    return;

                }

                if(
                    q.reverse
                ){

                    v=
                        6-
                        v;

                }

                score[
                    q.dimension
                    ]+=
                    v;

            },
        );

    const percent={

        D:
            convert(
                score.D,
                counter.D,
            ),

        I:
            convert(
                score.I,
                counter.I,
            ),

        S:
            convert(
                score.S,
                counter.S,
            ),

        C:
            convert(
                score.C,
                counter.C,
            ),

    };

    const sort=
        Object
            .entries(
                percent,
            )
            .sort(
                (
                    a,
                    b,
                )=>

                    b[
                        1
                        ]-
                    a[
                        1
                        ],
            );

    const primary=
        sort[
            0
            ][0];

    const secondary=
        sort[
            1
            ][0];

    const code=
        `${primary}${secondary}`;

    return{

        score,

        percent,

        primary,

        secondary,

        code,

        name:
            typeMap[
                code
                ]||
            '综合型',

    };

}