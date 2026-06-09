const KEY='mbti_test';

export const storage={

    get(){

        const data=
            localStorage.getItem(
                KEY,
            );

        return data
            ? JSON.parse(
                data,
            )
            : null;

    },

    set(
        value:any,
    ){

        localStorage.setItem(
            KEY,
            JSON.stringify(
                value,
            ),
        );

    },

    remove(){

        localStorage.removeItem(
            KEY,
        );

    },

};