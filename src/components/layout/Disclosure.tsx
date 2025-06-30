'use client';

import { useEffect, useRef, useState } from 'react';
import FlexBox from '@/components/layout/FlexBox';
import Icons from '@/components/Icons';

interface DisclosureProps {
    title: string;
    description?: string;
    isRequired?: boolean;
    defaultOpen?: boolean;
    hasQ?: boolean;
    children: React.ReactNode;
}

const Disclosure = ({
    title,
    description,
    isRequired = false,
    defaultOpen = true,
    children,
    hasQ,
}: DisclosureProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const contentRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (contentRef.current) {
            const el = contentRef.current;
            if (isOpen) {
                el.style.maxHeight = '0px';
                requestAnimationFrame(() => {
                    el.style.maxHeight = el.scrollHeight + 'px';
                });
            } else {
                el.style.maxHeight = '0px';
            }
        }
    }, [isOpen, children]);

    return (
        <FlexBox direction="col" className="rounded-[20px] border border-gray-200 p-6 bg-white">
            <FlexBox className="justify-between items-center text-[#394150] leading-snug text-sm md:text-base gap-2">
                <FlexBox className="gap-1">
                    {hasQ && <p className="font-semibold">Q.</p>}
                    <p>
                        <span className="break-keep font-semibold">{title}</span>
                        <span>{description}</span>
                        {isRequired && <span className="text-[#FF0073CC]">*</span>}
                    </p>
                </FlexBox>
                <button onClick={handleToggle} className="cursor-pointer min-w-6 min-h-6">
                    <Icons name="arrow" width={24} height={24} className={`duration-500 ${isOpen && 'rotate-180'}`} />
                </button>
            </FlexBox>
            <div
                ref={contentRef}
                style={{
                    maxHeight: '0px',
                    overflow: 'hidden',
                    transition: 'max-height 0.5s ease',
                }}
            >
                <div className="w-full h-px bg-gray-200 my-5" />
                {children}
            </div>
        </FlexBox>
    );
};

export default Disclosure;
