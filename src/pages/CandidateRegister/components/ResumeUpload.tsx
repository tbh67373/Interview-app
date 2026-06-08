import React from 'react';

import {
    Upload,
    Button,
    message,
} from 'antd';

import type {
    UploadProps,
    UploadFile,
} from 'antd';

import {
    UploadOutlined,
} from '@ant-design/icons';

interface UploadResult {
    annexId: string;

    fileName: string;

    fileUrl: string;
}

interface Props {
    value?: UploadResult[];

    onChange?: (
        value: UploadResult[],
    ) => void;
}

const MAX_SIZE =
    10 *
    1024 *
    1024;

const ResumeUpload: React.FC<
    Props
> = ({
         value = [],
         onChange,
     }) => {
    const customRequest:
        UploadProps['customRequest'] =
        async option => {
            try {
                const {
                    file,
                    onSuccess,
                    onError,
                } =
                    option;

                const formData =
                    new FormData();

                formData.append(
                    'file',
                    file as File,
                );

                const res =
                    await fetch(
                        '/api/annex/inspect',
                        {
                            method:
                                'POST',

                            body:
                            formData,
                        },
                    );

                const data =
                    await res.json();

                if (
                    !res.ok
                ) {
                    throw new Error(
                        data.message,
                    );
                }

                const uploadInfo =
                    {
                        annexId:
                        data.annexId,

                        fileName:
                        data.fileName,

                        fileUrl:
                        data.fileUrl,
                    };

                onChange?.([
                    uploadInfo,
                ]);

                onSuccess?.(
                    uploadInfo,
                );
            } catch (
                e
                ) {
                message.error(
                    '上传失败',
                );
            }
        };

    const beforeUpload:
        UploadProps['beforeUpload'] =
        file => {
            const ext =
                file.name
                    .split(
                        '.',
                    )
                    .pop()
                    ?.toLowerCase();

            if (
                ![
                    'pdf',
                    'doc',
                    'docx',
                ].includes(
                    ext ||
                    '',
                )
            ) {
                message.error(
                    '仅支持pdf/doc/docx',
                );

                return Upload.LIST_IGNORE;
            }

            if (
                file.size >
                MAX_SIZE
            ) {
                message.error(
                    '文件不能超过10MB',
                );

                return Upload.LIST_IGNORE;
            }

            return true;
        };

    const fileList:
        UploadFile[] =
        value.map(
            item => ({
                uid:
                item.annexId,

                name:
                item.fileName,

                status:
                    'done',

                url:
                item.fileUrl,
            }),
        );

    return (
        <Upload
            maxCount={1}
            customRequest={
                customRequest
            }
            beforeUpload={
                beforeUpload
            }
            fileList={
                fileList
            }
            onRemove={() =>
                onChange?.(
                    [],
                )
            }
        >
            {!value.length && (
                <Button
                    icon={
                        <UploadOutlined />
                    }
                >
                    上传简历
                </Button>
            )}
        </Upload>
    );
};

export default ResumeUpload;