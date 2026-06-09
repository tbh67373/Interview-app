import {
    SubmitData,
} from './types';

export function calcResult(
    data:SubmitData,
){

    const score={

        E:0,
        I:0,

        S:0,
        N:0,

        T:0,
        F:0,

        J:0,
        P:0,

    };

    data.questions
        .forEach(
            q=>{

                let v=

                    Number(
                        data.answers[
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
                        6-v;

                }

                score[
                    q.dimension
                    ]+=
                    v;

            },
        );
    const rawType =

        `${

            score.E >= score.I ? 'E' : 'I'

        }${

            score.S >= score.N ? 'S' : 'N'

        }${

            score.T >= score.F ? 'T' : 'F'

        }${

            score.J >= score.P ? 'J' : 'P'

        }`;

    const type = rawType.replace(/\s/g, '');

    return{

        score,

        type,

    };

}