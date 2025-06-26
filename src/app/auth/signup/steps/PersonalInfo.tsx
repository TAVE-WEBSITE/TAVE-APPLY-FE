'use client';

import InputContainer from '@/components/layout/InputContainer';
import InputField from '@/components/Input/InputField';
import FlexBox from '@/components/layout/FlexBox';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import SelectOptions from '@/components/Input/SelectOptions';
import { handleBirthInput } from '@/utils/formatBirth';
import { isValidPhoneNumber, isValidBirth } from '@/utils/validate';
import { useSignUpStore } from '@/store/signUpStore';

const PersonalInfo = () => {
    const {
        name,
        phoneNumber,
        birth,
        selectedGender,
        setName,
        setPhoneNumber,
        setBirth,
        setSelectedGender,
        setCurrentStep,
    } = useSignUpStore();

    const gender = ['남성', '여성'];

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/[^\d]/g, '');

        if (!numbers) {
            setPhoneNumber('');
            return;
        }

        const formatted =
            numbers.length <= 3
                ? numbers
                : numbers.length <= 7
                ? `${numbers.slice(0, 3)}-${numbers.slice(3)}`
                : `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;

        setPhoneNumber(formatted);
    };

    const handleCheck = () => {
        if (name.length && isValidPhoneNumber(phoneNumber) && isValidBirth(birth) && selectedGender.length) {
            return true;
        } else return false;
    };

    return (
        <FlexBox direction="col" className="gap-4">
            <p className="font-bold md:text-2xl text-xl text-[#394150] text-center mb-2">개인 정보 입력</p>
            <InputContainer label="이름">
                <InputField value={name} setValue={setName} placeholder="이름을 입력해주세요" />
            </InputContainer>
            <InputContainer label="전화번호">
                <InputField value={phoneNumber} setValue={formatPhoneNumber} placeholder="전화번호를 입력해주세요" />
            </InputContainer>
            <InputContainer label="생년월일">
                <InputField
                    value={birth}
                    setValue={(val) => handleBirthInput(val, setBirth)}
                    placeholder="YYMMDD 형식으로 입력해주세요"
                />
            </InputContainer>
            <InputContainer label="성별">
                <SelectOptions options={gender} selectedOption={selectedGender} setSelectedOption={setSelectedGender} />
            </InputContainer>
            <div className="flex flex-col-reverse md:flex-row md:justify-between mt-4 gap-1">
                <ButtonNavigate text="이전" hasBackGround={false} onClick={() => setCurrentStep(1)} />
                <ButtonNavigate text="다음" isActive={handleCheck()} onClick={() => setCurrentStep(3)} />
            </div>
        </FlexBox>
    );
};

export default PersonalInfo;
