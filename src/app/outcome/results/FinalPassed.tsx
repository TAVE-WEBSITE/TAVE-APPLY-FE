import FlexBox from '@/components/layout/FlexBox';
import CardNavigate from '@/components/card/CardNavigate';
import EnterContainer from '@/components/layout/EnterContainer';
import ButtonInquire from '@/components/Button/ButtonInquire';
import { FinalData } from '@/modules/resultType';
import { FormattedSession } from '@/modules/homeType';

interface FinalPassedProps {
    username: string;
    generation: string;
    firstSession: FormattedSession;
    final: FinalData;
}

const FinalPassed = ({ username, generation, final, firstSession }: FinalPassedProps) => {
    return (
        <div className="text-[#394150] text-center">
            <FlexBox direction="col" className="md:gap-28 gap-23">
                <div>
                    <p className="text-lg md:text-xl font-bold">
                        TAVE {generation}기 회원이 되신 것을 <br className="md:hidden" />
                        진심으로 축하드립니다!
                    </p>
                    <p className="font-medium text-[13px] md:text-base">
                        <br />
                        안녕하세요, IT 연합 동아리 TAVE {generation}기 운영진 입니다.
                        <br />
                        {username}님께서 TAVE {generation}기 회원 모집에
                        <span className="text-pink-600 font-extrabold"> 최종 합격</span>
                        하셨습니다. <br />
                        <br />
                        아래 사항을 차근차근 읽고 이행해주시면 감사하겠습니다. <br />
                        <span className="text-[#FF0073] font-bold">
                            미 이행 시 합격이 취소될 수 있으니,
                            <br className="md:hidden" />이 점 유의해 주시기 바랍니다.
                        </span>
                    </p>
                </div>

                <FlexBox direction="col" className="gap-5 font-medium text-sm md:text-base leading-normal">
                    <div className="font-bold">
                        <p className="opacity-60 md:text-lg text-base">STEP 01</p>
                        <p className="md:text-2xl text-xl">회비 입금</p>
                    </div>
                    <div>
                        <p>
                            {generation}기 회비는 총
                            <span className="text-[#195bff] font-bold"> {final.totalFee}원</span>입니다.
                        </p>
                        <p className="text-[#394150]/60">
                            (동아리 회비 {final.clubFee}원 + MT 회비 {final.mtFee}원)
                        </p>
                    </div>
                    <p className="md:mb-4">
                        TAVE의 회비의 사용 내역은 투명하게 공개하고,
                        <br className="md:hidden" />
                        정기적으로 회계 결산 발표가 진행됩니다.
                    </p>
                    <CardNavigate
                        title="회비 입금 마감"
                        buttonText="지금 입금하기"
                        deadline={final.feeDeadline}
                        type="copy"
                        value={final.bankName + ' ' + final.accountNumber + ' ' + final.accountHolder}
                    />
                </FlexBox>

                <FlexBox direction="col" className="gap-5">
                    <div className="font-bold">
                        <p className="opacity-60 md:text-lg text-base">STEP 02</p>
                        <p className="md:text-2xl text-xl">아지트 초대 설문 조사</p>
                    </div>
                    <p className="font-medium text-sm md:text-base md:mb-4">
                        온라인 플랫폼
                        <span className="text-[#195bff] font-bold"> “아지트”</span>를 활용하여{' '}
                        <br className="md:hidden" />
                        TAVE 공지와 활동이 이루어지고 있습니다. <br />
                        <br className="md:hidden" />
                        원활한 아지트 초대를 위해 정보 조사를 진행하고 있으니 <br className="md:hidden" />꼭 작성
                        부탁드립니다.
                    </p>
                    <CardNavigate
                        title="아지트 설문 조사"
                        buttonText="지금 작성하기"
                        deadline={final.surveyDeadline}
                        type="link"
                        value={final.surveyLink}
                    />
                </FlexBox>

                <FlexBox direction="col" className="gap-5">
                    <div className="font-bold">
                        <p className="opacity-60 md:text-lg text-base">STEP 03</p>
                        <p className="md:text-2xl text-xl">{firstSession.title} 공지방 입장</p>
                    </div>
                    <p className="font-medium text-sm md:text-base md:mb-4">
                        {firstSession.date}에 진행될 TAVE {generation}기의 첫 행사인 <br className="md:hidden" />‘
                        {firstSession.title}’를 위한 공지방입니다.
                        <br className="md:hidden" />
                        <br />
                        원활한 인원 파악 및 진행을 위해 <br className="md:hidden" />
                        하단의 주의 사항을 읽고 진행해주세요.
                    </p>
                    <div>
                        <p className="font-bold text-[#394150]/60 md:text-lg text-base">입장시 주의사항</p>
                        <div className="grid grid-cols-2 text-xs md:text-sm mt-4 font-medium md:gap-4 gap-2">
                            <EnterContainer label="이름" description="전화번호 뒷자리/기수/분야" />
                            <EnterContainer label="예시" description="2018/15기/FE" />
                            <EnterContainer
                                label="지원분야 양식"
                                children={
                                    <FlexBox direction="col" className="gap-2 mt-3 px-4">
                                        {[
                                            ['디자인', 'DE'],
                                            ['웹 & 앱 프론트엔드', 'FE'],
                                            ['백엔드', 'BE'],
                                            ['데이터분석', 'DA'],
                                            ['딥러닝', 'DL'],
                                        ].map(([label, code]) => (
                                            <FlexBox key={code} className="w-full justify-between">
                                                <span className="text-black">{label}</span>
                                                <span className="text-black/60">{code}</span>
                                            </FlexBox>
                                        ))}
                                    </FlexBox>
                                }
                            />
                            <FlexBox direction="col" className="md:gap-4 gap-2">
                                <EnterContainer label="사담 금지" description="조용히 입장 부탁드립니다" mode="light" />
                                <EnterContainer label="참여 코드" description={final.otPassword} mode="deep" />
                            </FlexBox>
                        </div>
                    </div>
                    <CardNavigate
                        title="공지방 입장"
                        buttonText="지금 입장하기"
                        deadline={final.otDeadline}
                        type="link"
                        value={final.otLink}
                    />
                </FlexBox>

                <FlexBox direction="col" className="gap-5 items-center pb-12">
                    <p className="text-xl md:text-2xl font-bold">궁금한 점이 있으신가요?</p>
                    <ButtonInquire />
                </FlexBox>
            </FlexBox>
        </div>
    );
};

export default FinalPassed;
