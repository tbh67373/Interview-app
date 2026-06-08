import React from 'react';
import {
    Form,
    Input,
    Radio,
    Select,
    DatePicker, Checkbox,
} from 'antd';

import ResumeUpload from './ResumeUpload';

import {
    mobileReg,
    idCardReg,
} from '../utils';
import {
    bloodTypeList,
    degreeList,
    educational,
    ethnicGroups,
    fertilityStatusList,
    maritalStatusList,
    politicalStatusList
} from "../../../utils/constant";

const BasicInfoSection: React.FC =
    () => {
        return (
            <>
                <tr>
                    <th>
                        应聘岗位
                    </th>

                    <td colSpan={7}>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'station',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入应聘岗位',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>
                </tr>
                <tr>
                    <th>
                        姓名
                    </th>

                    <td>
                        <Form.Item
                            name={[
                                'basicInfo',
                                'name',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入姓名',
                                },
                            ]}
                        >
                            <Input

                            />
                        </Form.Item>
                    </td>

                    <th>
                        性别
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'gender',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择性别',
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value="男">
                                    男
                                </Radio>

                                <Radio value="女">
                                    女
                                </Radio>
                            </Radio.Group>
                        </Form.Item>
                    </td>
                    <th>
                        民族
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'nation',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择民族',
                                },
                            ]}
                        >
                            <Select
                                options={ethnicGroups}
                                showSearch
                                optionLabelProp={'label'}
                                style={{width:'100%'}}
                                variant="borderless"
                            />
                        </Form.Item>
                    </td>

                    <th>
                        出生年月
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'birthday',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择出生年月',
                                },
                            ]}
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
                </tr>

                <tr>
                    <th>
                        政治面貌
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'politicalStatus',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择政治面貌',
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
                    <th>
                        籍贯
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'registeredAddress',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入籍贯',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>


                    <th>
                        婚姻状况
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'maritalStatus',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择婚姻状况',
                                },
                            ]}
                        >
                            <Select
                                options={maritalStatusList}
                                showSearch
                                optionLabelProp={'label'}
                                style={{width:'100%'}}
                                variant="borderless"
                            />
                        </Form.Item>
                    </td>

                    <th>
                        孕育状况
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'GestationStatus',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择孕育状况',
                                },
                            ]}
                        >
                            <Select
                                options={fertilityStatusList}
                                showSearch
                                optionLabelProp={'label'}
                                style={{width:'100%'}}
                                variant="borderless"
                            />
                        </Form.Item>
                    </td>
                </tr>

                <tr>
                    <th>
                        身份证号
                    </th>

                    <td colSpan={3}>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'idCard',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入身份证号',
                                },
                                {
                                    pattern:
                                    idCardReg,
                                    message:
                                        '身份证格式错误',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>

                    <th>
                        血型
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'bloodType',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择血型',
                                },
                            ]}
                        >
                            <Select
                                options={bloodTypeList}
                                showSearch
                                optionLabelProp={'label'}
                                style={{width:'100%'}}
                                variant="borderless"
                            />
                        </Form.Item>
                    </td>

                    <th>
                        身高
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'height',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入身高',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>

                </tr>

                <tr>
                    <th>
                        英语级别
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'level',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择英语级别',
                                },
                            ]}
                        >
                            <Checkbox.Group>
                                <Checkbox value="四级">
                                    四级
                                </Checkbox>

                                <Checkbox value="六级">
                                    六级
                                </Checkbox>
                            </Checkbox.Group>
                        </Form.Item>
                    </td>

                    <th>
                        英语得分
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'englishScore',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入英语得分',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>

                    <th>
                        最高学历
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'highestBackground',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择最高学历',
                                },
                            ]}
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

                    <th>
                        最高学位
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'highestDegree',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择最高学位',
                                },
                            ]}
                        >
                            <Select
                                options={degreeList}
                                showSearch
                                optionLabelProp={'label'}
                                style={{width:'100%'}}
                                variant="borderless"
                            />
                        </Form.Item>
                    </td>

                </tr>

                <tr>
                    <th>
                        毕业学校
                    </th>

                    <td colSpan={3}>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'graduatedFrom',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入毕业学校',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>

                    <th>
                        毕业时间
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'highestDate',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请选择毕业时间',
                                },
                            ]}
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

                    <th>
                        所学专业
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'professional',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入所学专业',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>
                </tr>

                <tr>
                    <th>
                        现居住地
                    </th>

                    <td colSpan={3}>
                        <div className="address-wrapper">

                            <div className="address-row">

                <span className="label">
                    地址：
                </span>

                                <Form.Item
                                    name={[
                                        'basicInfo',
                                        'address',
                                        'detail',
                                    ]}
                                    style={{
                                        flex: 1,
                                        marginBottom: 0,
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                '请输入现居住地址',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                            </div>

                            <div className="address-row">

                                <Form.Item
                                    name={[
                                        'basicInfo',
                                        'address',
                                        'type',
                                    ]}
                                    style={{
                                        marginBottom: 0,
                                    }}
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                '请选择居住方式',
                                        },
                                    ]}
                                >
                                    <Radio.Group>

                                        <Radio value="租赁">
                                            租赁
                                        </Radio>

                                        <Radio value="自购">
                                            自购
                                        </Radio>

                                        <Radio value="其他">
                                            其他
                                        </Radio>

                                    </Radio.Group>

                                </Form.Item>

                            </div>

                        </div>
                    </td>

                    <th>
                        联系电话
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
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
                                        '请输入手机号',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>

                    <th>
                        紧急联系电话
                    </th>

                    <td>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'emergencyPhone',
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
                                        '请输入手机号',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>
                </tr>

                <tr>
                    <th>
                        目前身体状况，有无既往病史
                    </th>

                    <td colSpan={3}>
                        <Form.Item
                            
                            name={[
                                'basicInfo',
                                'emergencyContact',
                            ]}
                            rules={[
                                {
                                    required: true,
                                    message:
                                        '请输入目前身体状况，有无既往病史',
                                },
                            ]}
                        >
                            <Input
                            />
                        </Form.Item>
                    </td>

                    <th>
                        简历附件
                    </th>

                    <td colSpan={3}>
                        <Form.Item

                            name="resumeFile"
                            valuePropName="value"
                            // rules={[
                            //     {
                            //         required: true,
                            //         message:
                            //             '请上传简历',
                            //     },
                            // ]}
                        >
                            <ResumeUpload />
                        </Form.Item>
                    </td>
                </tr>
            </>
        );
    };

export default BasicInfoSection;