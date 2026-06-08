export type Dimension =
    | 'communication'
    | 'stress'
    | 'execution'
    | 'teamwork'
    | 'learning'

export interface Question {

    id:string

    title:string

    dimension:Dimension

    options:{
        label:string
        score:number
    }[]

}