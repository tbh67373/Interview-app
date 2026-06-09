export type Dimension =
    | 'D'
    | 'I'
    | 'S'
    | 'C';

export interface Question {

    id:number;

    title:string;

    dimension:Dimension;

    reverse?:boolean;

}

export interface SubmitData{

    questions:Question[];

    answers:Record<
        number,
        number
    >;

    startTime:number;

    submitTime:number;

}