'use client';

interface ButtonNavigateProps {
    text: string;
    onClick: () => void;
    isActive?: boolean;
    hasBackGround?: boolean;
}

const ButtonNavigate = ({ text, isActive = true, onClick, hasBackGround = true }: ButtonNavigateProps) => {
    return (
        <button
            className={`w-full md:w-auto py-3.5 px-5.5 rounded-[10px] font-bold  
        ${hasBackGround ? 'bg-[#195BFF] text-white' : 'md:bg-gray-200 md:text-zinc-400 bg-transparent text-gray-400'}
      } ${isActive ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
            onClick={onClick}
            disabled={!isActive}
        >
            {text}
        </button>
    );
};

export default ButtonNavigate;
