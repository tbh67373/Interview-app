import React from 'react';

import {
    Form,
    Button,
    DatePicker,
    Input,
    Space,
} from 'antd';

import {
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

import {
    mobileReg,
} from '../utils';

const { TextArea } = Input;

const WorkSection: React.FC =
    () => {
        return (
            <tr>
                <th>
                    工作经历
                </th>

                <td colSpan={7}>
                    <Form.List
                        name="workList"
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
                                            开始时间
                                        </th>

                                        <th>
                                            结束时间
                                        </th>

                                        <th>
                                            公司名称
                                        </th>

                                        <th>
                                            岗位
                                        </th>

                                        <th>
                                            薪资(当年年薪、社保基数、公积金基数及比例)
                                        </th>

                                        <th>
                                            证明人
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
                                            <React.Fragment
                                                key={
                                                    field.key
                                                }
                                            >
                                                <tr>
                                                    <td>
                                                        <Form.Item
                                                            name={[
                                                                field.name,
                                                                'startDate',
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
                                                            <DatePicker
                                                                picker="month"
                                                                style={{
                                                                    width:
                                                                        '100%',
                                                                }}
                                                                placeholder={''}
                                                            />
                                                        </Form.Item>
                                                    </td>

                                                    <td>
                                                        <Form.Item
                                                            name={[
                                                                field.name,
                                                                'endDate',
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
                                                            <DatePicker
                                                                picker="month"
                                                                style={{
                                                                    width:
                                                                        '100%',
                                                                }}
                                                                placeholder={''}
                                                            />
                                                        </Form.Item>
                                                    </td>

                                                    <td>
                                                        <Form.Item
                                                            name={[
                                                                field.name,
                                                                'company',
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
                                                                'position',
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
                                                                'salary',
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
                                                                'witness',
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
                                                                'witnessPhone',
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
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        离职原因
                                                    </td>

                                                    <td
                                                        colSpan={
                                                            7
                                                        }
                                                    >
                                                        <Form.Item
                                                            name={[
                                                                field.name,
                                                                'leaveReason',
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
                                                            <TextArea
                                                                rows={
                                                                    2
                                                                }
                                                            />
                                                        </Form.Item>
                                                    </td>
                                                </tr>
                                            </React.Fragment>
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
                                                startDate:
                                                undefined,
                                                endDate:
                                                undefined,
                                                company:
                                                    '',
                                                department:
                                                    '',
                                                position:
                                                    '',
                                                salary:
                                                    '',
                                                witness:
                                                    '',
                                                witnessPhone:
                                                    '',
                                                leaveReason:
                                                    '',
                                            })
                                        }
                                    >
                                        新增工作经历
                                    </Button>
                                </Space>
                            </>
                        )}
                    </Form.List>
                </td>
            </tr>
        );
    };

export default WorkSection;