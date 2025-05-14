"use client";

import LoadingSpinner from "../LoadingSpinner";

export interface ButtonNavigateProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  hasBackGround?: boolean;
  isLoading?: boolean;
  className?: string;
}

const ButtonNavigate = ({
  text,
  isActive = true,
  onClick,
  hasBackGround = true,
  isLoading = false,
  className,
}: ButtonNavigateProps) => {
  return (
    <button
      className={`w-full md:w-[72px] h-[50px] rounded-lg font-bold cursor-pointer 
        ${
          hasBackGround
            ? "bg-[#195BFF] text-white"
            : "md:bg-[#195BFF] md:text-white bg-[#F9FAFB] text-[#B0B3B9]"
        }
      } ${isActive ? "" : "opacity-60"} ${className ?? ""}`}
      onClick={onClick}
      disabled={!isActive}
    >
      {isLoading ? (
        <div className="flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        text
      )}
    </button>
  );
};

export default ButtonNavigate;
