import React from 'react';

import {
    Form,
    Button,
    Select,
    DatePicker,
    Input,
    Space,
} from 'antd';

import {
    PlusOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import {educational, isYesOrNo} from "../constant";

const EducationSection: React.FC =
    () => {
        return (
            <tr>
                <th>
                    教育背景
                </th>

                <td colSpan={7}>
                    <Form.List
                        name="educationList"
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
                                            学历
                                        </th>

                                        <th>
                                            入学时间
                                        </th>

                                        <th>
                                            毕业时间
                                        </th>

                                        <th>
                                            毕业院校
                                        </th>

                                        <th>
                                            所学专业
                                        </th>

                                        <th>
                                            学制
                                        </th>

                                        <th>
                                            是否全日制
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
                                                            'education',
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
                                                        <Select
                                                            options={educational}
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
                                                            'school',
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
                                                            'major',
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
                                                            'educationalSystem',
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
                                                            'fullTime',
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
                                                        <Select
                                                            options={
                                                                isYesOrNo
                                                            }
                                                            variant="borderless"
                                                        />
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
                                                education:
                                                undefined,
                                                startDate:
                                                undefined,
                                                endDate:
                                                undefined,
                                                school:
                                                    '',
                                                major:
                                                    '',
                                            })
                                        }
                                    >
                                        新增教育经历
                                    </Button>
                                </Space>
                            </>
                        )}
                    </Form.List>
                </td>
            </tr>
        );
    };

export default EducationSection;