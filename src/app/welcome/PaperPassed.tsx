import FlexBox from '@/components/layout/FlexBox';
import Link from 'next/link';

const PaperPassed = () => {
    return (
        <div className="text-[#394150] text-center">
            <FlexBox direction="col" className="gap-32 items-center">
                <FlexBox direction="col" className="gap-8">
                    <p className="text-lg md:text-xl font-bold">
                        000님 <br className="block md:hidden" /> 서류합격을 축하드립니다
                    </p>
                    <FlexBox direction="col" className="gap-4">
                        <p className="font-medium text-sm md:text-base">
                            안녕하세요, IT 연합 동아리 TAVE 16기 운영진 입니다. <br />
                            귀한 시시간 내어 저희 TAVE 16기에 지원해을 해주신 것에 깊은 감사를 드립니다.
                        </p>
                        <p className="font-medium text-sm md:text-base">
                            면접에 대해 자세한 내용은 아래를 참조해주세요.
                        </p>
                    </FlexBox>
                </FlexBox>
                <FlexBox direction="col" className="gap-8">
                    <p className="text-lg md:text-xl font-bold">진행 방식</p>
                    <FlexBox direction="col" className="gap-4">
                        <p className="font-medium text-sm md:text-base">
                            <span className="font-bold">25 분간</span> 동아리 임원진과 간단하게 이야기를 나누는
                            형식이며, <br />
                            <span className="font-bold">多 대 多 면접</span>으로 진행될 예정입니다.
                        </p>
                    </FlexBox>
                </FlexBox>
                <FlexBox direction="col" className="gap-8">
                    <p className="text-lg md:text-xl font-bold">장소 및 일정</p>
                    <FlexBox direction="col" className="gap-4">
                        <p className="font-medium text-sm md:text-base">
                            서울대학교 대양 AI 센터
                            <br />
                            14:00 ~ 14:30
                        </p>
                    </FlexBox>
                </FlexBox>
                <FlexBox direction="col" className="gap-8">
                    <p className="text-lg md:text-xl font-bold">준비 사항</p>
                    <FlexBox direction="col" className="gap-4">
                        <FlexBox
                            direction="col"
                            className="w-[600px] md:w-[270px] border border-[#E5E7EB] rounded-xl bg-white p-6 gap-4 items-center"
                        >
                            <p>
                                1. 면접 오픈 채팅방에 <span className="font-bold text-[#ff0072]">면접 하루 전</span>까지
                                <span className="font-bold text-[#ff0072]"> 실명</span>으로 접속해주세요
                            </p>
                            <Link href="/" className="bg-[#195BFF] text-white font-bold text-sm rounded-xl py-3 px-6">
                                1:1 문의하기
                            </Link>
                            <p className="text-[#394150]/60">참여 코드 : 140238</p>
                        </FlexBox>
                        <div className="w-[600px] md:w-[270px] border border-[#E5E7EB] rounded-xl bg-white p-4">
                            <p>
                                2. 원활한 면접 진행을 위해 면접 장소에{' '}
                                <span className="font-bold text-[#ff0072]">10분 전에는 도착</span> 해주세요
                            </p>
                        </div>
                        <div className="w-auto md:w-[270px] border border-[#E5E7EB] rounded-xl bg-white p-4">
                            <p>3. 작성하신 지원서를 바탕으로 면접이 진행됩니다</p>
                        </div>
                    </FlexBox>
                </FlexBox>

                <FlexBox direction="col" className="gap-8">
                    <p className="text-lg md:text-xl font-bold">주의 사항</p>
                    <FlexBox direction="col" className="gap-4">
                        <div className="w-auto md:w-[270px] border border-[#E5E7EB] rounded-xl bg-white p-4">
                            <p>면접 시간은 불가피한 경우를 제외하고는 조정이 어렵습니다</p>
                        </div>
                        <div className="w-auto md:w-[270px] border border-[#E5E7EB] rounded-xl bg-white p-4">
                            <p>
                                면접 시간에 늦을 시에
                                <span className="font-bold text-[#ff0072]"> 불이익</span>이 발생할 수 있습니다
                            </p>
                        </div>
                        <div className="w-auto md:w-[270px] border border-[#E5E7EB] rounded-xl bg-white p-4">
                            <p>면접 시간 수정이 필요한 경우 카카오 채널로 문의 부탁드립니다</p>
                        </div>
                    </FlexBox>
                </FlexBox>

                <Link href="/" className="w-[154px] bg-black text-white rounded-xl py-3 px-4">
                    1:1 문의하기
                </Link>
            </FlexBox>
        </div>
    );
};

export default PaperPassed;
