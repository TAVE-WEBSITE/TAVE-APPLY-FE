'use client';

import InputContainer from '@/components/layout/InputContainer';
import InputField from '@/components/Input/InputField';
import FlexBox from '@/components/layout/FlexBox';
import { useRecruitStore } from '@/store/recruitStore';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import { RecruitField } from '@/modules/recruitType';
import Select from '@/components/select/Select';
import { useEffect } from 'react';
import { useRecruit } from '@/hooks/useRecruit';
import { useHomeStore } from '@/store/homeStore';
import { useMemberStore } from '@/store/memberStore';
import { recruitToFormattedField } from '@/utils/formatField';
import { formattedToRecruitField } from '@/utils/formatField';

const lables = ['이름', '성별', '생년월일', '연락처', '이메일 주소'];
const options: RecruitField[] = ['디자인', '웹 프론트엔드', '앱 프론트엔드', '백엔드', '데이터분석', '딥러닝'];
 
const PersonalInfo = () => {
    const { generation } = useHomeStore();
    const { getPersonal, postApplication } = useRecruit();
    const { username, email, memberId } = useMemberStore();

    useEffect(() => {
        if (!memberId) return;

        const fetchPersonal = async () => {
            await getPersonal(memberId);
        };

        fetchPersonal();
    }, [memberId]);

    const {
        sex,
        phoneNumber,
        birthday,
        school,
        major,
        minorDouble,
        applyField,
        setSchool,
        setMajor,
        setMinorDouble,
        setApplyField,
        setCurrentStep,
    } = useRecruitStore();

    const handlePostResume = async () => {
        console.log(school, major, minorDouble, applyField, generation);
        if (applyField !== '선택') {
            const res = await postApplication(
                {
                    school: school,
                    major: major,
                    minor: minorDouble,
                    field: recruitToFormattedField(applyField),
                    generation: generation,
                },
                memberId
            );
            if (res === 200) {
                setCurrentStep(2);
            }
        }
    };
    const formatSex = (value: string) => {
        if (value === 'MALE') return '남자';
        if (value === 'FEMALE') return '여자';
        return '';
    };

    const handleCheck = () => {
        console.log(applyField);
        return (school ?? '').trim().length > 0 && (major ?? '').trim().length > 0 && applyField !== null;
    };

    return (
        <>
            <h1 className="font-bold text-2xl text-[#394150] text-center">개인 정보 입력</h1>
            <FlexBox direction="col" className="pt-4 gap-8">
                <InputContainer label="이름">
                    <InputField value={username ?? ''} disabled />
                </InputContainer>
                <InputContainer label="성별">
                    <InputField value={formatSex(sex) ?? ''} disabled />
                </InputContainer>
                <InputContainer label="생년월일">
                    <InputField value={birthday ?? ''} disabled />
                </InputContainer>
                <InputContainer label="연락처">
                    <InputField value={phoneNumber ?? ''} disabled />
                </InputContainer>
                <InputContainer label="이메일 주소">
                    <InputField value={email ?? ''} disabled />
                </InputContainer>
                <InputContainer label="지원분야" isRequired={true} description="기수 당 1개의 분야만 지원 가능합니다.">
                    <Select selectedValue={applyField ?? '선택'} setSelectedValue={setApplyField}>
                        <Select.Trigger>
                            <Select.Options>
                                {options.map((option) => (
                                    <Select.Option key={option} value={option} />
                                ))}
                            </Select.Options>
                        </Select.Trigger>
                    </Select>
                </InputContainer>
                <InputContainer label="학교" isRequired={true}>
                    <InputField value={school ?? ''} setValue={setSchool} placeholder="학교를 입력해주세요" />
                </InputContainer>
                <InputContainer label="전공" isRequired={true}>
                    <InputField value={major ?? ''} setValue={setMajor} placeholder="전공을 입력해주세요" />
                </InputContainer>
                <InputContainer label="부전공/복수전공" isRequired={true}>
                    <InputField
                        value={minorDouble ?? ''}
                        setValue={setMinorDouble}
                        placeholder="부전공 or 복수전공을 입력해주세요"
                    />
                </InputContainer>
                <FlexBox className="justify-end">
                    <ButtonNavigate
                        text="다음"
                        onClick={() => {
                            handlePostResume();
                        }}
                        isActive={handleCheck()}
                    />
                </FlexBox>
            </FlexBox>
        </>
    );
};

export default PersonalInfo;
