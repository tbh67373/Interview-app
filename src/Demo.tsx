import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react';

import {
    Button,
    Card,
    Col,
    Divider,
    Form,
    Row,
    Select,
    Space,
    Tabs,
    Tree,
    Typography,
    message,
} from 'antd';

const {Text} = Typography;

/**
 * =========================================================
 * mock二维数组
 * 一个子数组 = 一个tabs
 * =========================================================
 */

const mockTabsData = [
    [
        {
            id: '41',
            detailType: '2',
            detail: 0,
            remark: '审批模式',
            detailName: 'submitConfig',
        },
        {
            id: '42',
            detailType: '1',
            detail: 'sql',
            remark: '业务日期',
            detailName: 'businessDate',
            returnValue: '2026-05-11',
        },
        {
            id: '43',
            detailType: '3',
            detail: '业务类型',
            remark: '业务类型',
            detailName: 'businessType',
        },
        {
            id: '44',
            detailType: '5',
            detail: null,
            remark: '扩展对象',
            detailName: 'extendValues',
            children: [
                {
                    id: '99',
                    detailType: '2',
                    detail: 1,
                    remark: '测试字段1',
                    detailName: 'test1',
                },
                {
                    id: '100',
                    detailType: '2',
                    detail: 1,
                    remark: '测试字段2',
                    detailName: 'test2',
                },
            ],
        },
        {
            id: '45',
            detailType: '4',
            detail: null,
            remark: '物料信息',
            detailName: 'itemList',
            children: [
                {
                    id: '456',
                    detailType: '2',
                    detail: 2,
                    remark: '测试字段3',
                    detailName: 'test3',
                },
                {
                    id: '457',
                    detailType: '1',
                    detail: 'sql',
                    remark: '业务名称',
                    detailName: 'businessName',
                    returnValue: 3,
                },
                {
                    id: '458',
                    detailType: '3',
                    detail: '业务属性',
                    remark: '业务属性',
                    detailName: 'businessAttr',
                },
            ],
            childrenValue: [
                {
                    '{"id":"456","detailType":"2","detail":2,"remark":"测试字段3","detailName":"test3"}': 2,
                    '{"id":"457","detailType":"2","detail":4,"remark":"测试字段4","detailName":"test4"}': 4,
                },
                {
                    '{"id":"456","detailType":"2","detail":2,"remark":"测试字段3","detailName":"test3"}': 8,
                    '{"id":"457","detailType":"2","detail":4,"remark":"测试字段4","detailName":"test4"}': 10,
                },
            ],
        },
    ],

    [
        {
            id: '88',
            detailType: '2',
            detail: 1,
            remark: '第二个订单审批模式',
            detailName: 'submitConfig2',
        },
        {
            id: '89',
            detailType: '3',
            detail: '业务类型',
            remark: '业务类型',
            detailName: 'businessType2',
        },
    ],
];

/**
 * =========================================================
 * mock数据字典
 * =========================================================
 */

const dictMap: any = {
    业务类型: [
        {
            label: '普通采购',
            value: 1,
        },
        {
            label: '紧急采购',
            value: 2,
        },
    ],

    业务属性: [
        {
            label: 'A类',
            value: 3,
        },
        {
            label: 'B类',
            value: 4,
        },
    ],
};

const getDictOptions = async (
    dictName: string,
) => {
    return new Promise<any[]>((resolve) => {
        setTimeout(() => {
            resolve(dictMap[dictName] || []);
        }, 200);
    });
};

/**
 * =========================================================
 * normalize type4
 * =========================================================
 */

const normalizeType4 = (item: any) => {
    if (item.detailType !== '4') {
        return item;
    }

    const rows = (
        item.childrenValue || []
    ).map((group: any) => {
        const row: any = {};

        Object.entries(group).forEach(
            ([key, value]) => {
                const field = JSON.parse(key);

                row[field.detailName] = {
                    ...field,
                    value,
                };
            },
        );

        return row;
    });

    return {
        ...item,
        rows,
    };
};

const normalizeData = (list: any[]) => {
    return list.map((item) => {
        const current =
            normalizeType4(item);

        if (current.children?.length) {
            current.children =
                normalizeData(
                    current.children,
                );
        }

        return current;
    });
};

/**
 * =========================================================
 * tree构建
 * =========================================================
 */

const buildTree = (list: any[]) => {
    const root: any = {
        key: 'root',
        title: '采购订单',
        data: [],
        children: [],
    };

    list.forEach((item) => {
        if (item.detailType === '4') {
            root.children.push({
                key: item.id,
                title: item.remark,
                raw: item,
                data:
                    item.children || [],
                children: [],
            });
        } else {
            root.data.push(item);
        }
    });

    return [root];
};

/**
 * =========================================================
 * 初始化form值
 * =========================================================
 */

const buildInitialValues = (
    list: any[],
) => {
    const values: any = {};

    const loop = (arr: any[]) => {
        arr.forEach((item) => {
            switch (
                item.detailType
                ) {
                case '1':
                    values[
                        item.detailName
                        ] =
                        item.returnValue;
                    break;

                case '2':
                    values[
                        item.detailName
                        ] = item.detail;
                    break;

                case '3':
                    values[
                        item.detailName
                        ] = undefined;
                    break;

                case '5':
                    loop(
                        item.children ||
                        [],
                    );
                    break;

                default:
                    break;
            }
        });
    };

    loop(list);

    return values;
};

/**
 * =========================================================
 * 构建最终提交数据
 * =========================================================
 */

const buildSubmitData = (
    list: any[],
    formValues: any,
) => {
    const result: any = {};

    list.forEach((item) => {
        switch (
            item.detailType
            ) {
            /**
             * 数据库映射
             */
            case '1':
                result[
                    item.detailName
                    ] =
                    item.returnValue;
                break;

            /**
             * 固定值
             */
            case '2':
                result[
                    item.detailName
                    ] = item.detail;
                break;

            /**
             * 人为选择
             */
            case '3':
                result[
                    item.detailName
                    ] =
                    formValues[
                        item.detailName
                        ] ?? null;
                break;

            /**
             * 对象
             */
            case '5':
                result[
                    item.detailName
                    ] =
                    buildSubmitData(
                        item.children ||
                        [],
                        formValues,
                    );
                break;

            /**
             * 数据组
             */
            case '4':
                /**
                 * 后端返回了childrenValue
                 */
                if (
                    item.rows?.length
                ) {
                    result[
                        item.detailName
                        ] =
                        item.rows.map(
                            (
                                row: any,
                            ) => {
                                const rowResult: any =
                                    {};

                                Object.values(
                                    row,
                                ).forEach(
                                    (
                                        field: any,
                                    ) => {
                                        rowResult[
                                            field.detailName
                                            ] =
                                            field.value;
                                    },
                                );

                                return rowResult;
                            },
                        );
                } else {
                    /**
                     * 用户自己填写
                     */
                    result[
                        item.detailName
                        ] = [
                        buildSubmitData(
                            item.children ||
                            [],
                            formValues,
                        ),
                    ];
                }

                break;

            default:
                break;
        }
    });

    return result;
};

/**
 * =========================================================
 * 单个tabs
 * =========================================================
 */

const OrderTab = forwardRef(
    (
        {
            data,
            tabKey,
        }: {
            data: any[]
            tabKey: string
        },
        ref,
    ) => {
        const [form] =
            Form.useForm();

        const normalizedData =
            useMemo(() => {
                return normalizeData(
                    data,
                );
            }, [data]);

        const treeData =
            useMemo(() => {
                return buildTree(
                    normalizedData,
                );
            }, [normalizedData]);

        const [
            currentNode,
            setCurrentNode,
        ] = useState<any>(
            treeData[0],
        );

        const [
            dictOptionsMap,
            setDictOptionsMap,
        ] = useState<any>({});

        /**
         * 初始化
         */
        useEffect(() => {
            const init =
                async () => {
                    const dictNames: string[] =
                        [];

                    const loop = (
                        arr: any[],
                    ) => {
                        arr.forEach(
                            (
                                item,
                            ) => {
                                if (
                                    item.detailType ===
                                    '3'
                                ) {
                                    dictNames.push(
                                        item.detail,
                                    );
                                }

                                if (
                                    item
                                        .children
                                        ?.length
                                ) {
                                    loop(
                                        item.children,
                                    );
                                }
                            },
                        );
                    };

                    loop(
                        normalizedData,
                    );

                    const unique =
                        Array.from(new Set(dictNames))

                    const map: any =
                        {};

                    for (const name of unique) {
                        map[name] =
                            await getDictOptions(
                                name,
                            );
                    }

                    setDictOptionsMap(
                        map,
                    );

                    form.setFieldsValue(
                        buildInitialValues(
                            normalizedData,
                        ),
                    );
                };

            init();
        }, []);

        /**
         * 暴露给父组件的方法
         */
        useImperativeHandle(
            ref,
            () => ({
                async getSubmitData() {
                    const values =
                        form.validateFields();

                    return buildSubmitData(
                        normalizedData,
                        values,
                    );
                },
            }),
        );

        /**
         * 渲染字段
         */
        const renderField = (
            item: any,
            value?: any,
        ) => {
            switch (
                item.detailType
                ) {
                /**
                 * 数据库映射
                 */
                case '1':
                    return (
                        <Form.Item
                            key={
                                item.id
                            }
                            label={
                                item.remark
                            }
                        >
                            <Text>
                                {value !==
                                undefined
                                    ? value
                                    : item.returnValue}
                            </Text>
                        </Form.Item>
                    );

                /**
                 * 固定值
                 */
                case '2':
                    return (
                        <Form.Item
                            key={
                                item.id
                            }
                            label={
                                item.remark
                            }
                        >
                            <Text>
                                {value !==
                                undefined
                                    ? value
                                    : item.detail}
                            </Text>
                        </Form.Item>
                    );

                /**
                 * 人为选择
                 */
                case '3':
                    return (
                        <Form.Item
                            key={
                                item.id
                            }
                            label={
                                item.remark
                            }
                            name={
                                item.detailName
                            }
                        >
                            <Select
                                placeholder="请选择"
                                options={
                                    dictOptionsMap[
                                        item
                                            .detail
                                        ] ||
                                    []
                                }
                            />
                        </Form.Item>
                    );

                /**
                 * 对象
                 */
                case '5':
                    return (
                        <Card
                            key={
                                item.id
                            }
                            title={
                                item.remark
                            }
                            size="small"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            {item.children?.map(
                                (
                                    child: any,
                                ) =>
                                    renderField(
                                        child,
                                    ),
                            )}
                        </Card>
                    );

                default:
                    return null;
            }
        };

        /**
         * 渲染childrenValue
         */
        const renderRows = (
            rows: any[],
        ) => {
            return rows.map(
                (
                    row,
                    index,
                ) => {
                    return (
                        <div
                            key={
                                index
                            }
                        >
                            {Object.values(
                                row,
                            ).map(
                                (
                                    field: any,
                                ) => {
                                    return (
                                        <Form.Item
                                            key={
                                                field.detailName
                                            }
                                            label={
                                                field.remark
                                            }
                                        >
                                            <Text>
                                                {
                                                    field.value
                                                }
                                            </Text>
                                        </Form.Item>
                                    );
                                },
                            )}

                            {index !==
                                rows.length -
                                1 && (
                                    <Divider />
                                )}
                        </div>
                    );
                },
            );
        };

        /**
         * 右侧渲染
         */
        const renderRight =
            () => {
                /**
                 * type4
                 */
                if (
                    currentNode
                        ?.raw
                        ?.detailType ===
                    '4'
                ) {
                    const raw =
                        currentNode.raw;

                    /**
                     * 有childrenValue
                     */
                    if (
                        raw.rows
                            ?.length
                    ) {
                        return renderRows(
                            raw.rows,
                        );
                    }

                    /**
                     * 没有childrenValue
                     */
                    return raw.children?.map(
                        (
                            item: any,
                        ) =>
                            renderField(
                                item,
                            ),
                    );
                }

                /**
                 * root
                 */
                return currentNode?.data?.map(
                    (
                        item: any,
                    ) =>
                        renderField(
                            item,
                        ),
                );
            };

        return (
            <Form form={form}>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card title="树结构">
                            <Tree
                                defaultExpandAll
                                treeData={
                                    treeData
                                }
                                fieldNames={{
                                    title:
                                        'title',
                                    key: 'key',
                                    children:
                                        'children',
                                }}
                                onSelect={(
                                    keys,
                                    info,
                                ) => {
                                    setCurrentNode(
                                        info.node,
                                    );
                                }}
                            />
                        </Card>
                    </Col>

                    <Col span={18}>
                        <Card title="详情">
                            {renderRight()}
                        </Card>
                    </Col>
                </Row>
            </Form>
        );
    },
);

/**
 * =========================================================
 * 主页面
 * =========================================================
 */

export default function PurchaseUploadPage() {
    /**
     * 所有tabs ref
     */
    const tabRefs =
        useRef<any>({});

    /**
     * 统一提交
     */
    const handleAllSubmit =
        async () => {
            try {
                const result =
                    [];

                const refs:any =
                    Object.values(
                        tabRefs.current,
                    );

                for (const ref of refs) {

                    const data =
                        await ref.getSubmitData();

                    result.push(data);
                }

                console.log(
                    '最终提交数据',
                    result,
                );

                message.success(
                    '提交成功',
                );

                /**
                 * 调接口
                 */
                // await api(result)

            } catch (e) {
                console.log(e);

                message.error(
                    '存在未填写项',
                );
            }
        };

    return (
        <Card
            title="采购订单上传"
            extra={
                <Space>
                    <Button
                        type="primary"
                        onClick={
                            handleAllSubmit
                        }
                    >
                        提交全部
                    </Button>
                </Space>
            }
        >
            <Tabs

                items={mockTabsData.map(
                    (
                        item,
                        index,
                    ) => {
                        return {
                            key: String(
                                index,
                            ),

                            label: `采购订单-${
                                index + 1
                            }`,
                            forceRender: true,
                            children: (
                                <OrderTab
                                    ref={(
                                        el,
                                    ) => {
                                        if (
                                            el
                                        ) {
                                            tabRefs.current[
                                                index
                                                ] =
                                                el;
                                        }
                                    }}
                                    data={
                                        item
                                    }
                                    tabKey={String(
                                        index,
                                    )}
                                />
                            ),
                        };
                    },
                )}
            />
        </Card>
    );
}