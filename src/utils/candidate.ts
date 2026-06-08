import dayjs from 'dayjs';

export const DATE_FORMAT = 'YYYY-MM';

/**
 * 保存草稿前转换
 */
export const serializeFormData = (
    data: any,
): any => {
    if (Array.isArray(data)) {
        return data.map(serializeFormData);
    }

    if (
        data &&
        typeof data === 'object'
    ) {
        const result: any = {};

        Object.keys(data).forEach((key) => {
            const value = data[key];

            if (
                dayjs.isDayjs(value)
            ) {
                result[key] =
                    value.format(DATE_FORMAT);
            } else {
                result[key] =
                    serializeFormData(value);
            }
        });

        return result;
    }

    return data;
};

/**
 * 草稿恢复
 */
export const deserializeFormData = (
    data: any,
): any => {
    if (Array.isArray(data)) {
        return data.map(
            deserializeFormData,
        );
    }

    if (
        data &&
        typeof data === 'object'
    ) {
        const result: any = {};

        Object.keys(data).forEach((key) => {
            const value = data[key];

            if (
                typeof value === 'string' &&
                /^\d{4}-\d{2}$/.test(value)
            ) {
                result[key] = dayjs(value);
            } else {
                result[key] =
                    deserializeFormData(value);
            }
        });

        return result;
    }

    return data;
};