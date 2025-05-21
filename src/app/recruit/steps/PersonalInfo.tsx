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

const lables = ['이름', '성별', '생년월일', '연락처', '이메일 주소'];
const options: RecruitField[] = ['UX/UI 디자이너', '웹 프론트엔드', '앱 프론트엔드', '백엔드', '데이터분석', '딥러닝'];

const PersonalInfo = () => {
    const { getPersonal, postPersonal, postResume } = useRecruit();

    const memberId = 44;

    useEffect(() => {
        getPersonal(memberId);
    }, [memberId]);

    const {
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

    const handlePostPersonal = async () => {
        const res = await postPersonal(
            {
                school: school,
                major: major,
                minor: minorDouble,
                field: applyField,
            },
            memberId
        );
    };

    const handlePostResume = async () => {
        const res = await postResume(
            {
                school: school,
                major: major,
                minor: minorDouble,
                field: 'BACKEND',
            },
            memberId
        );
    };

    // /** 다음 스텝으로 넘어가기 위해 버튼 활성화를 결정하는 변수 */
    // const isActive =
    //   school !== "" && major !== "" && minorDouble !== "" && applyField !== "";

    return (
        <>
            <h1 className="font-bold text-2xl text-[#394150] text-center">개인 정보 입력</h1>
            <FlexBox direction="col" className="pt-4 gap-8">
                {lables.map((label) => (
                    <InputContainer key={label} label={label}>
                        <InputField value={label} readonly />
                    </InputContainer>
                ))}
                <InputContainer label="지원분야" isRequired={true} description="기수 당 1개의 분야만 지원 가능합니다.">
                    <Select selectedValue={applyField} setSelectedValue={setApplyField}>
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
                    <InputField value={school} setValue={setSchool} placeholder="학교를 입력해주세요" />
                </InputContainer>
                <InputContainer label="전공" isRequired={true}>
                    <InputField value={major} setValue={setMajor} placeholder="전공을 입력해주세요" />
                </InputContainer>
                <InputContainer label="부전공/복수전공" isRequired={true}>
                    <InputField
                        value={minorDouble}
                        setValue={setMinorDouble}
                        placeholder="부전공 or 복수전공을 입력해주세요"
                    />
                </InputContainer>
                <FlexBox className="justify-end">
                    <ButtonNavigate
                        text="다음"
                        onClick={() => {
                            setCurrentStep(2);
                            handlePostPersonal();
                            handlePostResume();
                        }}
                    />
                </FlexBox>
            </FlexBox>
        </>
    );
};

export default PersonalInfo;
