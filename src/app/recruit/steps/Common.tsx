import { useState } from "react";
import Disclosure from "@/components/Disclosure";
import TextArea from "@/components/Input/TextArea";
import FlexBox from "@/components/layout/FlexBox";
import ButtonNavigate from "@/components/Button/ButtonNavigate";
import Uploader from "@/components/upload/Uploader";
import useRecruitStore from "@/store/recruitStore";

const uploadOptions = ["Github", "Tech Blog", "Portfolio"];
type uploadType = "text" | "file";

const Common = () => {
  const { setCurrentStep } = useRecruitStore();
  const [question1, setQuestion1] = useState("");

  const [selectedOption, setSelectedOption] = useState("");
  const [uploadType, setUploadType] = useState<uploadType>("text");
  const [uploadValue, setUploadValue] = useState();

  const handleOnChange = () => {};

  console.log(selectedOption);
  return (
    <>
      <h1 className="font-bold text-2xl text-[#394150] text-center">
        공통 질문
      </h1>
      <Disclosure
        title={"지원 동기와 TAVE 활동을 통해 얻고 싶은 것을 적어주세요."}
        isRequired={true}
      >
        <TextArea
          value={question1}
          setValue={setQuestion1}
          placeholder="지원자님의 경험을 공유해주세요"
          maxLength={500}
        />
      </Disclosure>
      <Disclosure
        title={"지원 동기와 TAVE 활동을 통해 얻고 싶은 것을 적어주세요."}
        isRequired={true}
      >
        <TextArea
          value={question1}
          setValue={setQuestion1}
          placeholder="지원자님의 경험을 공유해주세요"
          maxLength={500}
        />
      </Disclosure>
      <Disclosure
        title={"3개의 키워드로 자신을 표현해주세요."}
        isRequired={true}
      >
        <TextArea
          value={question1}
          setValue={setQuestion1}
          placeholder="지원자님의 경험을 공유해주세요"
          maxLength={500}
        />
      </Disclosure>

      <Disclosure title={"이번 학기 계획이 있으신가요?"} isRequired={true}>
        <TextArea
          value={question1}
          setValue={setQuestion1}
          placeholder="지원자님의 경험을 공유해주세요"
          maxLength={500}
        />
      </Disclosure>

      <Disclosure
        title={
          "아래의 목록 중 홍길동님께서 소유하고 있으신 것이 있다면 자유롭게 첨부해주세요 :)"
        }
        isRequired={true}
      >
        <Uploader
          options={uploadOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          setUploadType={setUploadType}
        >
          <Uploader.UploadField
            key={selectedOption}
            type={uploadType}
            value={uploadValue}
            setValue={setUploadValue}
            onChange={handleOnChange}
          />
        </Uploader>
      </Disclosure>

      <Disclosure
        title={"가능한 오프라인 면접 시간을 모두 체크해주세요"}
        isRequired={true}
      >
        <TextArea
          value={question1}
          setValue={setQuestion1}
          placeholder="지원자님의 경험을 공유해주세요"
          maxLength={500}
        />
      </Disclosure>
      <FlexBox className="justify-between my-8">
        <ButtonNavigate text="이전" onClick={() => setCurrentStep(1)} />
        <button
          className="w-[120px] h-[50px] rounded-lg font-bold cursor-pointer md:bg-[#195BFF] md:text-white bg-[#F9FAFB] text-[#B0B3B9]"
          onClick={() => setCurrentStep(4)}
        >
          제출하기
        </button>
      </FlexBox>
    </>
  );
};

export default Common;
