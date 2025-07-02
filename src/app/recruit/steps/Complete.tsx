'use client';

import { useRouter } from 'next/navigation';
import { useHomeStore } from '@/store/homeStore';
import { useRecruitStore } from '@/store/recruitStore';
import SectionContainer from '@/components/layout/SectionContainer';
import FlexBox from '@/components/layout/FlexBox';
import ButtonNavigate from '@/components/Button/ButtonNavigate';

const Complete = () => {
    const router = useRouter();
    const { setIsClickedFourth } = useRecruitStore();
    const { generation, firstSession, secondSession } = useHomeStore();
    return (
        <FlexBox direction="col" className="md:gap-7 gap-5 text-gray-700">
            <p className="font-bold md:text-2xl text-xl text-center">지원 완료</p>
            <p className="text-center text-sm md:text-base font-medium">
                작성해주신 서류가 성공적으로 제출되면
                <br />
                가입하신 이메일로 지원 완료 메일이 전송됩니다.
            </p>
            <FlexBox direction="col" className="md:gap-5 gap-4">
                <SectionContainer type="recruit">
                    <p>1)</p>
                    <p>
                        TAVE {generation}기 활동은 매주 토요일에 <span className="text-red-600">오프라인</span>으로
                        <br className="sm:hidden" />
                        <span className="hidden sm:inline"> </span>
                        진행됩니다.
                    </p>
                </SectionContainer>

                <SectionContainer type="recruit">
                    <p>2)</p>
                    <p>
                        모든 정기 세션은 <span className="text-red-600">필수 참여</span>가 원칙이며, 토요일
                        <br className="md:hidden" />
                        <span className="hidden md:inline"> </span>
                        14시 ~ 18시 사이에 진행됩니다.
                    </p>
                </SectionContainer>

                <SectionContainer type="recruit">
                    <p>3)</p>
                    <p className="break-keep">
                        TAVE {generation}기 {firstSession.title}는
                        <span className="text-red-600"> {firstSession.date}</span>이며,
                        <br className="md:hidden" />
                        <span className="hidden md:inline"> </span>
                        {secondSession.title}는(은)
                        <span className="text-red-500"> {firstSession.date}</span>에 진행될 예정입니다.
                    </p>
                </SectionContainer>

                <SectionContainer type="recruit">
                    <p>4)</p>
                    <p className="break-keep">
                        합격 후 {firstSession.title}, {secondSession.title} 불참으로 인한
                        <br className="sm:hidden" />
                        <span className="hidden sm:inline"> </span>
                        합격 취소 시 회비는 환불되지 않습니다.
                    </p>
                </SectionContainer>
            </FlexBox>
            <FlexBox className="justify-center mt-4">
                <ButtonNavigate
                    text="확인했습니다"
                    onClick={() => {
                        setIsClickedFourth(true);
                        router.push('/mypage');
                    }}
                />
            </FlexBox>
        </FlexBox>
    );
};

export default Complete;
