import React, {
    useEffect,
    useState,
} from 'react';

import {
    Form,
    Button,
    message,
    Typography,
} from 'antd';

// import { useLocation } from 'react-router-dom';

import {
    serializeFormData,
    deserializeFormData,
    transformSubmitData,
} from './utils';

import BasicInfoSection from './components/BasicInfoSection';
import EducationSection from './components/EducationSection';
import WorkSection from './components/WorkSection';
import FamilySection from './components/FamilySection';
import OtherSection from './components/OtherSection';

import './style.less';

const DRAFT_KEY =
    'candidate_register_draft';

const { Title } = Typography;

const CandidateRegister: React.FC =
    () => {
        const [form] =
            Form.useForm();

        // const {search} = useLocation();

        const [submitting,
            setSubmitting] =
            useState(false);

        const candidateId =
            new URLSearchParams(
                window.location.search,
            ).get('id');

        /**
         * 初始化草稿
         */
        useEffect(() => {
            const draft =
                localStorage.getItem(
                    DRAFT_KEY,
                );

            if (!draft) return;

            try {
                const values =
                    deserializeFormData(
                        JSON.parse(
                            draft,
                        ),
                    );

                form.setFieldsValue(
                    values,
                );
            } catch (e) {
                console.error(
                    e,
                );
            }
        }, [form]);

        /**
         * 保存草稿
         */
        const saveDraft =
            () => {
                const values =
                    form.getFieldsValue(
                        true,
                    );

                const data =
                    serializeFormData(
                        values,
                    );

                localStorage.setItem(
                    DRAFT_KEY,
                    JSON.stringify(
                        data,
                    ),
                );

                message.success(
                    '草稿已保存',
                );
            };

        /**
         * 提交
         */
        const onFinish =
            async () => {
                try {
                    if (
                        submitting
                    )
                        return;

                    setSubmitting(
                        true,
                    );

                    const values =
                        await form.validateFields();

                    const submitData =
                        transformSubmitData(
                            values,
                        );

                    console.log(
                        '提交参数',
                        {
                            candidateId,
                            ...submitData,
                        },
                    );

                    /**
                     * TODO
                     */
                    // await api.submit({
                    //     candidateId,
                    //     ...submitData,
                    // });

                    localStorage.removeItem(
                        DRAFT_KEY,
                    );

                    message.success(
                        '提交成功',
                    );
                } catch (
                    error
                    ) {
                    console.log(
                        error,
                    );
                } finally {
                    setSubmitting(
                        false,
                    );
                }
            };

        return (
            <div className="candidate-register-page">
                <Title
                    level={2}
                    style={{
                        textAlign:
                            'center',
                        marginBottom:
                            24,
                    }}
                >
                    应聘登记表
                </Title>

                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        educationList:
                            [{}],

                        familyList:
                            [{}],

                        workList:
                            [],
                    }}
                >
                    <table className="register-table">
                        <tbody>
                        <BasicInfoSection />

                        <EducationSection />

                        <WorkSection />

                        <FamilySection />

                        <OtherSection />
                        </tbody>
                    </table>

                    <div className="footer-btn">
                        <Button
                            onClick={
                                saveDraft
                            }
                        >
                            保存草稿
                        </Button>

                        <Button
                            type="primary"
                            loading={
                                submitting
                            }
                            onClick={
                                onFinish
                            }
                        >
                            提交
                        </Button>
                    </div>
                </Form>
            </div>
        );
    };

export default CandidateRegister;