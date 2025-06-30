'use client';

import { useRouter } from 'next/navigation';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import SectionContainer from '@/components/layout/SectionContainer';
import FlexBox from '@/components/layout/FlexBox';
import { useHomeStore } from '@/store/homeStore';

const Complete = () => {
    const router = useRouter();
    const { generation, firstSession, secondSession } = useHomeStore();
    return (
        <FlexBox direction="col" className="gap-6 w-full">
            <h1 className="font-bold text-2xl text-[#394150] text-center">지원 완료</h1>
            <h2 className="text-center text-[#394150] font-lg font-medium">
                작성해주신 서류가 성공적으로 제출되면 <br />
                가입하신 이메일로 지원 완료 메일 전송됩니다.
            </h2>
            <FlexBox direction="col" className="w-full gap-4 items-center text-[#394150]">
                <SectionContainer>
                    <p>
                        1) TAVE {generation}기 활동은 매주 토요일에 <span className="text-red-500">오프라인</span>으로
                        진행됩니다.
                    </p>
                </SectionContainer>

                <SectionContainer>
                    <p>
                        2) 모든 정기 세션은 <span className="text-red-500">필수 참여</span>가 원칙이며, 토요일 14시 ~
                        18시 사이에 진행됩니다.
                    </p>
                </SectionContainer>

                <SectionContainer>
                    <p>
                        3) TAVE {generation}기 {firstSession.title}는
                        <span className="text-red-500"> {firstSession.date} </span>
                        이며, {secondSession.title}은<span className="text-red-500"> {secondSession.date}</span> 에
                        진행될 예정입니다.
                    </p>
                </SectionContainer>

                <SectionContainer>
                    <p>
                        4) 합격 후 {firstSession.title}, {secondSession.title} 불참으로 인한 합격 취소 시 회비 환불되지
                        않습니다.
                    </p>
                </SectionContainer>
            </FlexBox>
            <FlexBox className="justify-center mt-8">
                <ButtonNavigate text="확인했습니다" onClick={() => router.push('/')} />
            </FlexBox>
        </FlexBox>
    );
};

export default Complete;
