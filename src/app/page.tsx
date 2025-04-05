import FlexBox from "./components/layout/FlexBox";
import Rectangle from "./components/Rectangle";

const currentSemester = 15;
export default function Home() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pt-32 ">
        <h2 className="font-bold text-4xl text-center">
          {currentSemester}기 모집 일정
        </h2>
        <FlexBox className="mt-16 gap-x-6 justify-center">
          <Rectangle
            iconName="file"
            title="서류 접수"
            description="3월 2일 (월) - 3월 15일 (수)"
          />
          <Rectangle
            iconName="calendar"
            title="서류 발표"
            description="3월 2일 (월) 오후 6시"
          />
          <Rectangle
            iconName="user"
            title="면접 진행"
            description="3월 2일 (월) - 3월 15일 (수)"
            extra="* 온/오프라인 별도 안내"
          />
          <Rectangle
            iconName="award"
            title="최종 발표"
            description="3월 2일 (월) 오후 6시"
          />
        </FlexBox>
      </div>
    </div>
  );
}
