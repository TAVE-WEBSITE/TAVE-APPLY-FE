'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import FlexBox from '../layout/FlexBox';

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
        // 현재 연도 기준으로 날짜 포맷 보정
        const parseDeadline = () => {
            if (/^\d{4}-\d{2}-\d{2}$/.test(deadline)) {
                return deadline; // 이미 연도 포함된 날짜
            }

            const thisYear = new Date().getFullYear();
            return `${thisYear}-${deadline}`; // ex: '06-08' → '2025-06-08'
        };

        const endTime = new Date(`${parseDeadline()}T23:59:59`);

        const updateRemainingTime = () => {
            const now = new Date();
            const diff = endTime.getTime() - now.getTime();

            if (diff <= 0) {
                setRemaining('');
                setIsEnded(true);
                return;
            }

            setIsEnded(false);

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setRemaining(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
        };

        updateRemainingTime();
        const timer = setInterval(updateRemainingTime, 1000);

        return () => {
            clearInterval(timer);
            if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
        };
    }, [deadline]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            setCopyStatus('copied');
            if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
            copyTimeoutRef.current = setTimeout(() => setCopyStatus('idle'), 2000);
        } catch {
            alert('복사에 실패했습니다.');
        }
    };

    const baseBtnClass = `${copyStatus === 'copied' ? 'opacity-40 bg-blue-700' : ''}  w-full md:w-auto py-2 px-3 rounded-lg text-sm text-nowrap text-center text-white`;
    const activeBtnClass = `bg-blue-600 hover:bg-blue-700 cursor-pointer`;
    const disabledBtnClass = 'bg-gray-400 cursor-not-allowed px-9.5';

    return (
        <div className="flex flex-col md:flex-row gap-4 md:gap-0 w-full md:w-4/5 mx-auto bg-white border border-[#E5E7EB] p-4 rounded-xl justify-between items-center shadow-md">
            <FlexBox direction="col" className="w-full text-xs md:text-sm items-start font-medium">
                <p>{title}</p>
                <p className="text-black">
                    {isEnded ? (
                        <span className="text-blue-600 font-bold">00일 00시간 00분 00초 </span>
                    ) : (
                        <span className="text-blue-600 font-bold">{remaining} </span>
                    )}
                    남았습니다.
                </p>
            </FlexBox>

            {type === 'link' ? (
                <Link
                    href={isEnded ? '#' : value}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${baseBtnClass} ${isEnded ? disabledBtnClass : activeBtnClass}`}
                    onClick={(e) => isEnded && e.preventDefault()}
                    aria-disabled={isEnded}
                    tabIndex={isEnded ? -1 : 0}
                >
                    {isEnded ? '마감' : buttonText}
                </Link>
            ) : (
                <button
                    type="button"
                    onClick={handleCopy}
                    disabled={isEnded}
                    className={`${baseBtnClass} ${
                        isEnded ? disabledBtnClass : copyStatus === 'copied' ? '계좌 복사 완료' : activeBtnClass
                    }`}
                    aria-disabled={isEnded}
                >
                    {isEnded ? '마감' : copyStatus === 'copied' ? '계좌 복사 완료' : buttonText}
                </button>
            )}
        </div>
    );
};

export default CardNavigate;
