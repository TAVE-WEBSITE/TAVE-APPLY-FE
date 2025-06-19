'use client';

import Disclosure from '@/components/layout/Disclosure';
import FlexBox from '@/components/layout/FlexBox';
import { faqActivityData, faqRecruitData } from '@/modules/staticData';
import { useState } from 'react';

const Faq = () => {
    const [selectedTab, setSelectedTab] = useState<'recruit' | 'activity'>('recruit');
    return (
        <>
            <FlexBox className="justify-center md:text-xl">
                <button
                    onClick={() => setSelectedTab('recruit')}
                    className={`transition-all px-3 md:px-4.5 cursor-pointer ${
                        selectedTab === 'recruit' ? 'text-[#394150] scale-105 font-bold' : 'text-[#868B94]'
                    }`}
                >
                    About Recruit
                </button>
                <button
                    onClick={() => setSelectedTab('activity')}
                    className={`transition-all px-3 md:px-4.5 cursor-pointer ${
                        selectedTab === 'activity' ? 'text-[#394150] scale-105 font-bold' : 'text-[#868B94]'
                    }`}
                >
                    About Activity
                </button>
            </FlexBox>
            {(selectedTab === 'recruit' ? faqRecruitData : faqActivityData).map((item, index) => (
                <Disclosure key={index} title={item.question} defaultOpen={index === 0 ? true : false} hasQ>
                    <FlexBox className="gap-1 font-medium text-[#394150]/60 leading-snug text-sm md:text-base">
                        <p>A.</p>
                        <p className="break-keep">{item.answer}</p>
                    </FlexBox>
                </Disclosure>
            ))}
        </>
    );
};

export default Faq;
