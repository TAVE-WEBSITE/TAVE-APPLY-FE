'use client';

import Disclosure from '@/components/Disclosure';
import TextArea from '@/components/Input/TextArea';
import FlexBox from '@/components/layout/FlexBox';
import ButtonNavigate from '@/components/Button/ButtonNavigate';
import { useState } from 'react';
import useRecruitStore from '@/store/recruitStore';

const Common = () => {
    const { setCurrentStep } = useRecruitStore();
    const [motivation, setMotivation] = useState('');
    const [keyword, setKeyword] = useState('');
    const [plan, setPlan] = useState('');
    return (
        <FlexBox direction="col" className="gap-10">
            <h1 className="font-bold text-2xl text-[#394150] text-center">공통 질문</h1>
            <Disclosure title="지원 동기와 TAVE 활동을 통해 얻고 싶은 것을 적어주세요." isRequired>
                <TextArea value={motivation} setValue={setMotivation} placeholder="채워야하는 말" maxLength={700} />
            </Disclosure>
            <Disclosure title={'3개의 키워드로 자신을 표현해주세요.'} isRequired>
                <TextArea value={keyword} setValue={setKeyword} placeholder="채워야하는 말" maxLength={700} />
            </Disclosure>
            <Disclosure title="이번 학기 계획이 있으신가요?" isRequired>
                <TextArea value={plan} setValue={setPlan} placeholder="채워야하는 말" maxLength={700} />
            </Disclosure>
            <Disclosure
                title={'아래의 목록 중 홍길동님께서 소유하고 있으신 것이 있다면\n자유롭게 첨부해주세요.'}
                isRequired
            >
                채워야하는 컴포넌트
            </Disclosure>
            <Disclosure title="가능한 오프라인 면접 시간을 모두 체크해주세요." isRequired>
                채워야하는 컴포넌트
            </Disclosure>
            <div className="flex md:flex-row flex-col md:justify-between">
                <ButtonNavigate text="다음" onClick={() => setCurrentStep(4)} />
                <ButtonNavigate hasBackGround={false} text="이전" onClick={() => setCurrentStep(2)} />
            </div>
        </FlexBox>
    );
};

export default Common;
