import dayjs, { Dayjs } from 'dayjs';

const MONTH_FIELDS = [
    'birthday',
    'startDate',
    'endDate',
    'highestDate',
];

const DAY_FIELDS = [
    'signatureTime',
    'entryDate',
];

const DATE_FIELDS = [
    ...MONTH_FIELDS,
    ...DAY_FIELDS,
];

const getDateFormat = (
    key?: string,
) => {
    if (
        MONTH_FIELDS.includes(
            key || '',
        )
    ) {
        return 'YYYY-MM';
    }

    return 'YYYY-MM-DD';
};

/**
 * 保存草稿前处理
 *
 * dayjs -> string
 */
export const serializeFormData =
    (
        data: any,
        parentKey?: string,
    ): any => {
        if (
            data === null ||
            data === undefined
        ) {
            return data;
        }

        if (
            dayjs.isDayjs(data)
        ) {
            return data.format(
                getDateFormat(
                    parentKey,
                ),
            );
        }

        if (
            Array.isArray(data)
        ) {
            return data.map(
                item =>
                    serializeFormData(
                        item,
                        parentKey,
                    ),
            );
        }

        if (
            typeof data ===
            'object'
        ) {
            const obj: any =
                {};

            Object.keys(
                data,
            ).forEach(
                key => {
                    obj[
                        key
                        ] =
                        serializeFormData(
                            data[
                                key
                                ],
                            key,
                        );
                },
            );

            return obj;
        }

        return data;
    };

/**
 * 草稿恢复
 *
 * string -> dayjs
 */
export const deserializeFormData =
    (
        data: any,
        parentKey?: string,
    ): any => {

        if (
            data === null ||
            data === undefined
        ) {
            return data;
        }

        if (
            Array.isArray(
                data,
            )
        ) {
            return data.map(
                item =>
                    deserializeFormData(
                        item,
                        parentKey,
                    ),
            );
        }

        if (
            typeof data ===
            'object'
        ) {

            const obj: any =
                {};

            Object.keys(
                data,
            ).forEach(
                key => {

                    obj[
                        key
                        ] =
                        deserializeFormData(
                            data[
                                key
                                ],
                            key,
                        );

                });

            return obj;

        }

        /* 只转换日期字段 */

        if (
            typeof data ===
            'string' &&
            DATE_FIELDS.includes(
                parentKey ||
                '',
            )
        ) {

            return dayjs(
                data,
                getDateFormat(
                    parentKey,
                ),
            );

        }

        return data;

    };

/**
 * 提交转换
 *
 * dayjs -> yyyy-MM
 */
export const transformSubmitData =
    (
        data: any,
        parentKey?: string,
    ): any => {
        if (
            data === null ||
            data === undefined
        ) {
            return data;
        }

        if (
            dayjs.isDayjs(data)
        ) {
            return data.format(
                getDateFormat(
                    parentKey,
                ),
            );
        }

        if (
            parentKey ===
            'resumeFile' &&
            Array.isArray(
                data,
            )
        ) {
            return JSON.stringify(
                data,
            );
        }

        if (
            Array.isArray(data)
        ) {
            return data.map(
                item =>
                    transformSubmitData(
                        item,
                        parentKey,
                    ),
            );
        }

        if (
            typeof data ===
            'object'
        ) {
            const obj: any =
                {};

            Object.keys(
                data,
            ).forEach(
                key => {
                    obj[
                        key
                        ] =
                        transformSubmitData(
                            data[
                                key
                                ],
                            key,
                        );
                },
            );

            return obj;
        }

        return data;
    };

/**
 * 手机号校验
 */
export const mobileReg =
    /^1\d{10}$/;

/**
 * 身份证校验
 */
export const idCardReg =
    /(^\d{15}$)|(^\d{17}(\d|X|x)$)/;