'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import FlexBox from '@/components/layout/FlexBox';

type InputFieldType = 'text' | 'email' | 'password' | 'number';

interface InputFieldProps<T extends string | number> {
    type?: InputFieldType;
    value: T;
    placeholder?: string;
    setValue?: (value: T) => void;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    isPassed?: boolean;
    isError?: boolean;
    passMessage?: string;
    errorMessage?: string;
    isCounting?: boolean;
    disabled?: boolean;
}

const InputField = <T extends string | number>({
    type = 'text',
    value,
    placeholder,
    setValue,
    onChange,
    isPassed = false,
    isError = false,
    passMessage,
    errorMessage,
    isCounting = false,
    disabled = false,
}: InputFieldProps<T>) => {
    const [remainingTime, setRemainingTime] = useState(300);

    const formatTime = (time: number) => {
        const minute = Math.floor(time / 60);
        const second = time % 60;
        return `${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;
    };

    useEffect(() => {
        if (isCounting) {
            setRemainingTime(300);
        }
    }, [isCounting]);

    useEffect(() => {
        if (!isCounting || remainingTime <= 0) return;

        const timer = setInterval(() => {
            setRemainingTime((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [isCounting, remainingTime]);

    return (
        <FlexBox direction="col" className="gap-1 w-full relative">
            <input
                type={type}
                value={value}
                placeholder={placeholder}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e);
                    }
                    const val = e.target.value;
                    if (type === 'number' && setValue) {
                        setValue(val === '' ? ('' as T) : (String(val) as T));
                    } else if (setValue) {
                        setValue(val as T);
                    }
                }}
                disabled={disabled}
                className={`w-full border p-3 md:p-4 rounded-[10px] text-gray-700 bg-white
                    placeholder:text-[#B0B3B9] focus:outline-none disabled:border-gray-200
                    focus:shadow-[0px_0px_24px_0px_#195BFF14] focus:border-blue-600/50
                    ${isError ? 'border-pink-600/80' : isPassed ? 'border-emerald-600/80' : 'border-gray-200'}`}
            />
            {errorMessage && <p className="md:text-sm text-xs text-pink-600/80">{errorMessage}</p>}
            {isPassed && <p className="md:text-sm text-xs text-emerald-600">{passMessage}</p>}
            {isCounting && (
                <p className="absolute bottom-[-20px] right-0 md:text-sm text-xs text-blue-300">
                    {formatTime(remainingTime)}
                </p>
            )}
        </FlexBox>
    );
};

export default InputField;
