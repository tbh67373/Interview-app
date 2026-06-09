export type Dimension =

    'E'
    |'I'

    |'S'
    |'N'

    |'T'
    |'F'

    |'J'
    |'P';

export interface Question{

    id:number;

    title:string;

    dimension:Dimension;

    reverse?:boolean;

}

export interface SubmitData{

    questions:
        Question[];

    answers:
        Record<
            number,
            number
        >;

    startTime:
        number;

    submitTime:
        number;

}