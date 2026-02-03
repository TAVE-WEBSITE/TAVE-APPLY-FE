'use client';

interface ButtonTimeSlotProps {
    time: string;
    isSelected: boolean;
    onClick?: () => void;
    isActive?: boolean;
}

const ButtonTimeSlot = ({ time, isSelected, onClick, isActive = true }: ButtonTimeSlotProps) => {
    return (
        <button
            className={`w-17 h-10 text-center rounded-[10px] border
        ${
            isSelected
                ? 'text-[#376DFF] bg-[#E9EFFF] border-[#C8D7FF] font-semibold'
                : 'font-medium bg-white text-[#B0B3B9] border-[#E5E7EB]'
        } 
        ${isActive && 'cursor-pointer'}
      `}
            onClick={() => {
                if (isActive && onClick) onClick();
            }}
            disabled={!isActive}
        >
            {time}
        </button>
    );
};

export default ButtonTimeSlot;
