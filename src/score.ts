import { questionBank } from './questionBank'

export const calcScore=(
    values:Record<string,number>
)=>{

    const dim={
        communication:0,
        stress:0,
        execution:0,
        teamwork:0,
        learning:0
    }

    Object.entries(values)
        .forEach(
            ([id,score])=>{

                const q=
                    questionBank.find(
                        v=>v.id===id
                    )

                if(q){

                    dim[q.dimension]+=score

                }

            }
        )

    const total=
        (
            dim.communication*0.25+
            dim.stress*0.2+
            dim.execution*0.25+
            dim.teamwork*0.2+
            dim.learning*0.1
        )

    let level='D'

    if(total>=90){
        level='A'
    }
    else if(total>=75){
        level='B'
    }
    else if(total>=60){
        level='C'
    }

    return{

        dimension:dim,

        total:
            Number(
                total.toFixed(1)
            ),

        level

    }

}