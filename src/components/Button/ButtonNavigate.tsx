'use client';

import LoadingSpinner from '@/components/LoadingSpinner';
import FlexBox from '@/components/layout/FlexBox';

interface ButtonNavigateProps {
    text: string;
    onClick: () => void;
    isActive?: boolean;
    hasBackGround?: boolean;
    isLoading?: boolean;
}

const ButtonNavigate = ({
    text,
    isActive = true,
    onClick,
    hasBackGround = true,
    isLoading = false,
}: ButtonNavigateProps) => {
    return (
        <button
            className={`w-full md:w-auto py-3.5 px-5.5 rounded-[10px] font-bold cursor-pointer 
        ${hasBackGround ? 'bg-[#195BFF] text-white' : 'md:bg-gray-200 md:text-zinc-400 bg-transparent text-gray-400'}
      } ${isActive ? '' : 'opacity-60'}`}
            onClick={onClick}
            disabled={!isActive}
        >
            {isLoading ? (
                <FlexBox className="justify-center">
                    <LoadingSpinner />
                </FlexBox>
            ) : (
                text
            )}
        </button>
    );
};

export default ButtonNavigate;
