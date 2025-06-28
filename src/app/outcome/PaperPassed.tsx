import FlexBox from '@/components/layout/FlexBox';
import Link from 'next/link';
import ButtonInquire from '@/components/Button/ButtonInquire';
import SectionContainer from '@/components/layout/SectionContainer';
import { InterviewData } from '@/modules/resultType';

interface PaperPassedProps {
    username: string;
    generation: string;
    interview: InterviewData;
}

const PaperPassed = ({ username, generation, interview }: PaperPassedProps) => {
    return (
        <div className="text-[#394150] text-center">
            <FlexBox direction="col" className="md:gap-28 gap-23">
                <div>
                    <p className="text-lg md:text-xl font-bold">
                        {username}님 <br />
                        서류 합격을 축하드립니다
                    </p>
                    <p className="font-medium text-sm md:text-base">
                        <br />
                        안녕하세요, IT 연합 동아리 TAVE {generation}기 운영진 입니다.
                        <br />
                        귀한 시간 내주어 저희 TAVE {generation}기에 지원을 해주신 것에 <br className="md:hidden" />
                        깊은 감사를 드립니다. <br />
                        <br />
                        면접에 대해 자세한 내용은 아래를 참조해주세요.
                    </p>
                </div>

                <div>
                    <p className="text-lg md:text-xl font-bold">진행 방식</p>
                    <p className="font-medium text-sm md:text-base">
                        <br />
                        <span className="font-bold">25 분간</span> 동아리 임원진과 간단하게
                        <br className="md:hidden" /> 이야기를 나누는 형식이며,
                        <br />
                        <span className="font-bold">多 대 多 면접</span>으로 진행될 예정입니다.
                    </p>
                </div>

                <FlexBox direction="col" className="gap-5">
                    <p className="text-lg md:text-xl font-bold">장소 및 일정</p>
                    <p className="font-medium text-sm md:text-base">
                        {interview.generalAddress} {interview.detailAddress}
                        <br />
                        {interview.interviewDate} {interview.dayName} {interview.interviewTime}
                    </p>
                </FlexBox>

                <FlexBox direction="col" className="gap-5 w-full">
                    <p className="text-lg md:text-xl font-bold">준비 사항</p>
                    <SectionContainer>
                        <p>
                            1. 면접 오픈 채팅방에 <span className="font-bold text-[#ff0072]">면접 하루 전</span>까지
                            <br className="md:hidden" />
                            <span className="font-bold text-[#ff0072]"> 실명</span>으로 접속해주세요.
                        </p>
                        <a
                            href={interview.openChatLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-3 px-6.5 md:w-auto md:mx-auto text-center bg-[#195BFF] text-white font-bold rounded-[10px]"
                        >
                            입장하기
                        </a>
                        <p className="text-[#394150]/60 text-center">참여 코드 : {interview.code}</p>
                    </SectionContainer>
                    <SectionContainer>
                        <p>
                            2. 원활한 면접 진행을 위해 면접 장소에 <br className="md:hidden" />
                            <span className="font-bold text-[#ff0072]"> 10분 전에는 도착</span>
                            해주세요.
                        </p>
                    </SectionContainer>
                    <SectionContainer>
                        <p>3. 작성하신 지원서를 바탕으로 면접이 진행됩니다.</p>
                    </SectionContainer>
                </FlexBox>

                <FlexBox direction="col" className="gap-5 w-full">
                    <p className="text-lg md:text-xl font-bold">주의 사항</p>
                    <SectionContainer>
                        <p>
                            면접 시간은 불가피한 경우를 제외하고는
                            <br className="md:hidden" /> 조정이 어렵습니다.
                        </p>
                    </SectionContainer>
                    <SectionContainer>
                        <p>
                            면접 시간에 늦을 시<span className="font-bold text-[#ff0072]"> 불이익</span>이 발생할 수
                            있습니다.
                        </p>
                    </SectionContainer>
                    <SectionContainer>
                        <p>
                            면접 시간 수정이 필요한 경우 카카오 채널로
                            <br className="md:hidden" /> 문의 부탁드립니다.
                        </p>
                    </SectionContainer>
                    <FlexBox className="justify-center pb-12">
                        <ButtonInquire />
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </div>
    );
};

export default PaperPassed;
