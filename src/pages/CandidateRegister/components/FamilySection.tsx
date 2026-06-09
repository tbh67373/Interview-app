import React from 'react';

import {
    Form,
    Button,
    Input,
    Space, Select,
} from 'antd';

import {
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import {
    mobileReg,
} from '../utils';
import {educational, politicalStatusList} from "../constant";

const FamilySection: React.FC =
    () => {
        return (
            <tr>
                <th>
                    家庭成员
                </th>

                <td colSpan={7}>
                    <Form.List
                        name="familyList"
                    >
                        {(
                            fields,
                            {
                                add,
                                remove,
                            },
                        ) => (
                            <>
                                <table className="inner-table">
                                    <thead>
                                    <tr>
                                        <th>
                                            关系
                                        </th>

                                        <th>
                                            姓名
                                        </th>

                                        <th>
                                            政治面貌
                                        </th>

                                        <th>
                                            工作单位
                                        </th>

                                        <th>
                                            职务
                                        </th>

                                        <th>
                                            联系电话
                                        </th>

                                        <th>
                                            操作
                                        </th>
                                    </tr>
                                    </thead>

                                    <tbody>
                                    {fields.map(
                                        field => (
                                            <tr
                                                key={
                                                    field.key
                                                }
                                            >
                                                <td>
                                                    <Form.Item
                                                        name={[
                                                            field.name,
                                                            'relation',
                                                        ]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    '',
                                                            },
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Input placeholder="父亲/母亲/配偶/子女" />
                                                    </Form.Item>
                                                </td>

                                                <td>
                                                    <Form.Item
                                                        name={[
                                                            field.name,
                                                            'name',
                                                        ]}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    '',
                                                            },
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </td>

                                                <td>
                                                    <Form.Item
                                                        name={[
                                                            field.name,
                                                            'politicalStatus',
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    '',
                                                            },
                                                        ]}
                                                    >
                                                        <Select
                                                            options={politicalStatusList}
                                                            showSearch
                                                            optionLabelProp={'label'}
                                                            style={{width:'100%'}}
                                                            variant="borderless"
                                                        />
                                                    </Form.Item>
                                                </td>

                                                <td>
                                                    <Form.Item
                                                        name={[
                                                            field.name,
                                                            'company',
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    '',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </td>

                                                <td>
                                                    <Form.Item
                                                        name={[
                                                            field.name,
                                                            'position',
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                        rules={[
                                                            {
                                                                required: true,
                                                                message:
                                                                    '',
                                                            },
                                                        ]}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </td>

                                                <td>
                                                    <Form.Item
                                                        name={[
                                                            field.name,
                                                            'phone',
                                                        ]}
                                                        rules={[
                                                            {
                                                                pattern:
                                                                mobileReg,
                                                                message:
                                                                    '手机号格式错误',
                                                            },
                                                            {
                                                                required: true,
                                                                message:
                                                                    '',
                                                            }
                                                        ]}
                                                        style={{
                                                            marginBottom: 0,
                                                        }}
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </td>

                                                <td
                                                    style={{
                                                        textAlign:
                                                            'center',
                                                    }}
                                                >
                                                    {fields.length >
                                                        1 && (
                                                            <Button
                                                                danger
                                                                size="small"
                                                                icon={
                                                                    <DeleteOutlined />
                                                                }
                                                                onClick={() =>
                                                                    remove(
                                                                        field.name,
                                                                    )
                                                                }
                                                            >
                                                                删除
                                                            </Button>
                                                        )}
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                    </tbody>
                                </table>

                                <Space
                                    style={{
                                        marginTop:
                                            12,
                                    }}
                                >
                                    <Button
                                        type="dashed"
                                        icon={
                                            <PlusOutlined />
                                        }
                                        onClick={() =>
                                            add({
                                                relation:
                                                    '',
                                                name:
                                                    '',
                                                age:
                                                    '',
                                                politicalStatus:
                                                    '',
                                                company:
                                                    '',
                                                position:
                                                    '',
                                                phone:
                                                    '',
                                            })
                                        }
                                    >
                                        新增家庭成员
                                    </Button>
                                </Space>
                            </>
                        )}
                    </Form.List>
                </td>
            </tr>
        );
    };

export default FamilySection;