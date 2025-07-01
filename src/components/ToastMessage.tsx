import { Dispatch, SetStateAction, useEffect } from 'react';
import FlexBox from '@/components/layout/FlexBox';

interface ToastMessageProps {
    message: string;
    isError?: boolean;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ToastMessage = ({ message, isError = false, isOpen, setIsOpen }: ToastMessageProps) => {
    useEffect(() => {
        if (isOpen) {
            const timer = setInterval(() => {
                setIsOpen(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, setIsOpen]);
    return (
        <div className={`fixed top-5/7 left-1/2 -translate-x-1/2 z-99 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`w-[308px] md:w-[340px] rounded-3xl ${
                    isError ? 'bg-pink-100/80 text-pink-600/80 border' : 'bg-blue-100/80 text-blue-600 border'
                }`}
            >
                <FlexBox className="justify-center items-center p-2.5 md:py-3">
                    <span className="text-sm md:text-base font-bold">{message}</span>
                </FlexBox>
            </div>
        </div>
    );
};

export default ToastMessage;
