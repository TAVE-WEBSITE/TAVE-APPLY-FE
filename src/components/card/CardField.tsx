'use client';

import FlexBox from '@/components/layout/FlexBox';
import { StaticImageData } from 'next/image';
import { useState } from 'react';

interface CardFieldProps {
    imgSrc: StaticImageData;
    hoverSrc: StaticImageData;
    title: string;
    subTitle: string;
    description: string;
    state: boolean;
}

const CardField = ({ title, imgSrc, subTitle, hoverSrc, description, state }: CardFieldProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardSrc = isHovered ? hoverSrc : imgSrc;
    const filteredSub = subTitle.toLowerCase().includes('frontend') ? subTitle.replace(/frontend/gi, '') : subTitle;

    return (
        <FlexBox direction="col" className="lg:w-[250px] w-[230px] gap-4">
            <div
                className="group flex flex-col justify-center pl-[19px] aspect-[312/170] rounded-xl
                transition-all duration-500 font-bold text-xl lg:text-2xl"
                style={{
                    backgroundImage: `url(${cardSrc.src})`,
                    backgroundSize: 'cover',
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {isHovered ? (
                    <>
                        <p className="text-white/60 text-lg lg:text-xl">{subTitle}</p>
                        <p className="text-2xl lg:text-3xl">{state === true ? '모집중' : '모집 마감'}</p>
                    </>
                ) : (
                    <>
                        {title}
                        <br />
                        {filteredSub}
                    </>
                )}
            </div>
            <FlexBox
                className="lg:h-[144px] h-[128px] items-center justify-center text-center bg-[#2A2C30]
            rounded-2xl text-white/80 lg:text-[13px] text-xs whitespace-pre-line"
            >
                {description}
            </FlexBox>
        </FlexBox>
    );
};

export default CardField;
