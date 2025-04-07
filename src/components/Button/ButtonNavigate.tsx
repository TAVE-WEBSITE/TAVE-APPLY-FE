"use client";

interface ButtonNavigateProps {
  text: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const ButtonNavigate = ({
  text,
  isActive = true,
  isDisabled,
  onClick,
  className,
}: ButtonNavigateProps) => {
  return (
    <button
      className={`w-[72px] h-[50px] rounded-lg font-bold cursor-pointer ${
        isDisabled
          ? "bg-[#E5E7EB] text-[#8D95A0] cursor-not-allowed"
          : "bg-[#195BFF] text-white"
      } ${isActive ? "" : "opacity-60"} ${className ?? ""}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
};

export default ButtonNavigate;
