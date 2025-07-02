'use client';

import InputContainer from '@/components/layout/InputContainer';
import InputField from '@/components/Input/InputField';
import FlexBox from '@/components/layout/FlexBox';
import Select from '@/components/select/Select';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import { PersonalResponse, RecruitField } from '@/modules/recruitType';
import { useEffect, useState } from 'react';
import { useRecruit } from '@/hooks/useRecruit';
import { useHomeStore } from '@/store/homeStore';
import { useRecruitStore } from '@/store/recruitStore';
import { formattedToRecruitField, recruitToFormattedField } from '@/utils/formatField';
import { useMemberStore } from '@/store/memberStore';

const PersonalInfo = () => {
    const { generation } = useHomeStore();
    const { memberId } = useMemberStore();
    const [personal, setPersonal] = useState<PersonalResponse>();
    const { applyPersonal, makeApplication } = useRecruit();
    const { applyField, school, major, minor, setSchool, setMajor, setMinor, setApplyField, setCurrentStep } =
        useRecruitStore();

    const options: RecruitField[] = ['디자인', '웹 프론트엔드', '앱 프론트엔드', '백엔드', '데이터분석', '딥러닝'];

    useEffect(() => {
        if (!memberId) return;

        const fetchPersonal = async () => {
            const data = await applyPersonal(memberId);
            setPersonal(data);
            setMajor(data.major);
            setMinor(data.minor);
            setSchool(data.school);
            setApplyField(formattedToRecruitField(data.field));
        };

        fetchPersonal();
    }, [memberId]);

    const handleApplication = async () => {
        if (applyField !== '선택') {
            const res = await makeApplication(
                {
                    school,
                    major,
                    minor: minor ?? '',
                    field: recruitToFormattedField(applyField),
                    generation,
                },
                memberId
            );
            if (res === 200) {
                setCurrentStep(2);
            }
        }
    };

    const personalFields = [
        { label: '이름', value: personal?.username },
        { label: '성별', value: personal?.sex === 'FEMALE' ? '여성' : '남성' },
        { label: '생년월일', value: personal?.birthday },
        { label: '전화번호', value: personal?.phoneNumber },
        { label: '이메일 주소', value: personal?.email },
    ];

    const handleCheck = () => {
        if ((school ?? '').trim().length && (major ?? '').trim().length && applyField !== undefined) return true;
        else return false;
    };

    return (
        <>
            <p className="font-bold md:text-2xl text-xl text-[#394150] text-center mb-4 md:mb-7">개인 정보 입력</p>
            <FlexBox direction="col" className="md:gap-6 gap-5">
                {personalFields.map(({ label, value }) => (
                    <InputContainer key={label} label={label} isRequired={false}>
                        <div
                            className="p-3 md:p-4 bg-gray-100 border-gray-200 border
                            rounded-[10px] text-[#A9ACB4] cursor-not-allowed"
                        >
                            {value}
                        </div>
                    </InputContainer>
                ))}
                <InputContainer
                    label="지원분야"
                    description="1개 분야만 지원 가능하며, 변경 시 기존 내용이 삭제됩니다."
                >
                    <Select selectedValue={applyField || '선택'} setSelectedValue={setApplyField}>
                        <Select.Trigger>
                            <Select.Options>
                                {options.map((option) => (
                                    <Select.Option key={option} value={option} />
                                ))}
                            </Select.Options>
                        </Select.Trigger>
                    </Select>
                </InputContainer>
                <InputContainer label="학교">
                    <InputField value={school ?? ''} setValue={setSchool} placeholder="학교를 입력해주세요" />
                </InputContainer>
                <InputContainer label="전공">
                    <InputField value={major ?? ''} setValue={setMajor} placeholder="전공을 입력해주세요" />
                </InputContainer>
                <InputContainer label="부전공/복수전공" isRequired={false}>
                    <InputField value={minor ?? ''} setValue={setMinor} placeholder="부전공/복수전공을 입력해주세요" />
                </InputContainer>
                <FlexBox className="justify-end mt-3 md:mt-2">
                    <ButtonNavigate text="다음" onClick={handleApplication} isActive={handleCheck()} />
                </FlexBox>
            </FlexBox>
        </>
    );
};

export default PersonalInfo;
