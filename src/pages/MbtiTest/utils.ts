import {
    Question,
    Dimension,
} from './types';

function shuffle<T>(
    arr:T[],
){

    const copy=[
        ...arr,
    ];

    for(

        let i=
            copy.length-
            1;

        i>
        0;

        i--

    ){

        const j=
            Math.floor(

                Math.random()

                *

                (
                    i+
                    1
                ),

            );

        [

            copy[
                i
                ],

            copy[
                j
                ],

        ]

            =

            [

                copy[
                    j
                    ],

                copy[
                    i
                    ],

            ];

    }

    return copy;

}

const RULE:{
    [key in Dimension]:
    number
}={

    E:4,

    I:4,

    S:4,

    N:4,

    T:4,

    F:3,

    J:4,

    P:3,

};

export function randomQuestions(

    list:Question[],

){

    const result:
        Question[]=[];

    Object
        .entries(
            RULE,
        )

        .forEach(

            ([

                 type,

                 count,

             ])=>{

                const group=

                    list.filter(

                        item=>

                            item.dimension===

                            type,

                    );

                const selected=

                    shuffle(
                        group,
                    )

                        .slice(

                            0,

                            count,

                        );

                result.push(

                    ...selected,

                );

            },

        );

    return shuffle(
        result,
    );

}