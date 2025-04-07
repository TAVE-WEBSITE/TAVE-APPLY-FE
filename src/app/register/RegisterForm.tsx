"use client";

import TextField from "../../components/Input/TextField";
import FlexBox from "../../components/layout/FlexBox";

const RegisterForm = () => {
  return (
    <FlexBox className="pt-12 md:w-[600px] mx-auto gap-4" direction="col">
      <h1 className="font-bold text-2xl text-[#394150] text-center">
        개인 정보 입력
      </h1>
      <TextField
        value={""}
        setValue={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        errorMessage={""}
        label={"이름"}
        placeholder={"이름을 입력해주세요"}
        isRequired={true}
      />
      <TextField
        value={""}
        setValue={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        errorMessage={""}
        label={"전화번호"}
        placeholder={"전화번호를 입력해주세요"}
        isRequired={true}
      />
      <TextField
        value={""}
        setValue={function (value: string): void {
          throw new Error("Function not implemented.");
        }}
        errorMessage={""}
        label={"생년월일"}
        placeholder={"YYMMDD 형식으로 입력해주세요"}
      />
      <FlexBox className="font-bold justify-between">
        <button className="w-[72px] h-[50px] bg-[#E5E7EB] rounded-lg text-[#8D95A0]">
          이전
        </button>
        <button className="w-[72px] h-[50px] bg-[#195BFF] rounded-lg">
          다음
        </button>
      </FlexBox>
    </FlexBox>
  );
};

export default RegisterForm;
