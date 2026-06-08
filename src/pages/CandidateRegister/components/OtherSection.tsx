import React from 'react';

import {
    Form,
    Input,
    DatePicker,
} from 'antd';

const { TextArea } = Input;

const OtherSection: React.FC =
    () => {
        return (
            <>
                <tr>
                    <th colSpan={2}>
                        是否受过行政、刑事处分或处罚
                    </th>

                    <td colSpan={2}>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'rewardPunishment',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入是否受过行政、刑事处分或处罚',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </td>

                    <th colSpan={2}>
                        是否有过商业信誉或商业行为方面不良记录
                    </th>

                    <td colSpan={2}>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'certificate',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入是否有过商业信誉或商业行为方面不良记录',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </td>
                </tr>

                <tr>
                    <th colSpan={4}>
                        确认以上信息信息真实无误，如有与事实不符，本人愿意承担一切责任！
                    </th>

                    <th>
                        签名
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'signature',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请签名',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </td>

                    <th>
                        日期
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'signatureTime',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请选择签名日期',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{
                                    width:
                                        '100%',
                                }}
                                placeholder={''}
                            />
                        </Form.Item>
                    </td>
                </tr>

                <tr>
                    <th>
                        个人专长或优点
                    </th>

                    <td colSpan={7}>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'speciality',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入个人专长或优点',
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                            />
                        </Form.Item>
                    </td>
                </tr>

                <tr>
                    <th>
                        兴趣爱好
                    </th>

                    <td colSpan={7}>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'hobbies',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入兴趣爱好',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </td>
                </tr>


                <tr>
                    <th>
                        自我评价
                    </th>

                    <td colSpan={7}>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'selfEvaluation',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入自我评价',
                                },
                            ]}
                        >
                            <TextArea
                                rows={6}
                            />
                        </Form.Item>
                    </td>
                </tr>

                <tr>
                    <th>
                        职业规划
                    </th>

                    <td colSpan={7}>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'careerPlan',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入职业规划',
                                },
                            ]}
                        >
                            <TextArea
                                rows={4}
                            />
                        </Form.Item>
                    </td>
                </tr>

                <tr>
                    <th>
                        期望工作地点
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'expectAddress',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入期望工作地点',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </td>

                    <th>
                        期望年薪（税前/元）
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'expectSalary',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入期望年薪（税前/元）',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </td>

                    <th>
                        目前就业/课业情况
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'currentStatus',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请输入目前就业/课业情况',
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>
                    </td>

                    <th>
                        最快入职时间
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'otherInfo',
                                'entryDate',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message: '请选择最快入职时间',
                                },
                            ]}
                        >
                            <DatePicker
                                style={{
                                    width:
                                        '100%',
                                }}
                                placeholder={''}
                            />
                        </Form.Item>
                    </td>
                </tr>
            </>
        );
    };

export default OtherSection;