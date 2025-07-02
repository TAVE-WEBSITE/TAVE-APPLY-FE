'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import FlexBox from '@/components/layout/FlexBox';

interface CardNavigateProps {
    title: string;
    buttonText: string;
    deadline: string;
    type: 'link' | 'copy';
    value: string;
}

const CardNavigate = ({ title, buttonText, deadline, type, value }: CardNavigateProps) => {
    const [remaining, setRemaining] = useState('00일 00시간 00분 00초');
    const [isEnded, setIsEnded] = useState(false);
    const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
    const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const endTime = new Date(`${deadline}T23:59:59`);

        const updateRemainingTime = () => {
            const now = new Date();
            const diff = endTime.getTime() - now.getTime();

            if (diff <= 0) {
                setRemaining('00일 00시간 00분 00초');
                setIsEnded(true);
                return;
            }

            setIsEnded(false);

            const format = (num: number) => num.toString().padStart(2, '0');

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setRemaining(`${format(days)}일 ${format(hours)}시간 ${format(minutes)}분 ${format(seconds)}초`);
        };

        updateRemainingTime();
        const timer = setInterval(updateRemainingTime, 1000);

        return () => {
            clearInterval(timer);
            if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        };
    }, [deadline]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopyStatus('copied');
        if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        copyTimeoutRef.current = setTimeout(() => setCopyStatus('idle'), 1000);
    };

    const baseBtnClass = `w-full md:w-[140px] py-2 rounded-lg text-sm text-nowrap text-center font-bold text-white
    ${copyStatus === 'copied' ? 'bg-blue-600 opacity-60' : ''} `;
    const activeBtnClass = `bg-blue-600 cursor-pointer`;
    const disabledBtnClass = 'bg-[#898989] cursor-not-allowed';
    const finalClass = `${isEnded ? disabledBtnClass : activeBtnClass} ${baseBtnClass}`;

    return (
        <div
            className="flex flex-col md:flex-row gap-4 w-full md:w-4/5 mx-auto
        bg-white border border-gray-200 p-3.5 rounded-xl text-sm md:text-base items-center"
        >
            <FlexBox direction="col" className="w-full items-start font-medium text-gray-700">
                <p>{title}</p>
                <p>
                    <span className="text-blue-600 font-bold">{remaining}</span> 남았습니다.
                </p>
            </FlexBox>

            {type === 'link' ? (
                <Link
                    href={value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={finalClass}
                    onClick={(e) => isEnded && e.preventDefault()}
                >
                    {isEnded ? '마감' : buttonText}
                </Link>
            ) : (
                <button onClick={handleCopy} disabled={isEnded} className={finalClass}>
                    {isEnded ? '마감' : copyStatus === 'copied' ? '계좌 복사 완료' : buttonText}
                </button>
            )}
        </div>
    );
};

export default CardNavigate;
