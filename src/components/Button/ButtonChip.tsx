'use client';

interface ButtonChipProps {
    text: string;
    isActive?: boolean;
    onClick: () => void;
}

const ButtonChip = ({ text, isActive = false, onClick }: ButtonChipProps) => {
    return (
        <button
            className={`md:py-2.5 py-2 md:px-4.5 px-3 md:text-base text-sm font-semibold rounded-4xl cursor-pointer
                ${isActive ? 'bg-gradient-to-br from-[#1a5bff] to-[#60afff]' : 'bg-[#313339] text-[#97999B]'} `}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ButtonChip;
