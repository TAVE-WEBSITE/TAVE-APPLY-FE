import LoadingSpinner from '@/components/LoadingSpinner';

interface ButtonAuthProps {
    text: string;
    isLoading: boolean;
    onClick: () => void;
    isActive?: boolean;
}

const ButtonAuth = ({ text, isActive = true, isLoading, onClick }: ButtonAuthProps) => {
    return (
        <button
            className={`md:text-[13px] text-xs font-bold bg-neutral-800 ${
                isActive ? 'cursor-pointer' : 'opacity-40 cursor-not-allowed'
            } rounded-lg w-[75px] md:h-[48px] h-[40px] flex justify-center items-center`}
            onClick={onClick}
            disabled={!isActive}
        >
            {isLoading ? <LoadingSpinner /> : text}
        </button>
    );
};

export default ButtonAuth;
