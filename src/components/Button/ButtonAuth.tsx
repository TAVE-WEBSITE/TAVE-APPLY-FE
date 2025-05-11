import LoadingSpinner from "../LoadingSpinner";

interface ButtonAuthProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isActive?: boolean;
  isLoading: boolean;
  onClick?: () => void;
}

const ButtonAuth = ({
  text,
  isActive = true,
  isLoading,
  onClick,
}: ButtonAuthProps) => {
  const handleClick = () => {
    if (onClick && isActive) {
      onClick();
    }
  };

  return (
    <button
      className={`md:w-[76px] w-[61px] h-[42px] md:text-sm text-xs bg-[#212225] cursor-pointer ${
        isActive ? "cursor-pointer" : "opacity-40 cursor-not-allowed"
      } rounded-lg text-white font-bold flex justify-center items-center`}
      onClick={handleClick}
      disabled={!isActive}
      aria-disabled={!isActive}
    >
      {isLoading ? <LoadingSpinner /> : text}
    </button>
  );
};

export default ButtonAuth;
