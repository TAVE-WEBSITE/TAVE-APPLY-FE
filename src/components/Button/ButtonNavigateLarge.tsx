"use client";

import { ButtonNavigateProps } from "./ButtonNavigate";

const ButtonNavigateLarge = ({
  text,
  isActive = true,
  onClick,
  hasBackGround = true,
  className,
}: ButtonNavigateProps) => {
  return (
    <button
      className={`w-full md:w-[140px] h-[50px] rounded-lg font-bold cursor-pointer 
        ${
          hasBackGround
            ? "bg-[#195BFF] text-white"
            : "md:bg-[#195BFF] md:text-white bg-[#F9FAFB] text-[#B0B3B9]"
        }
      } ${isActive ? "" : "opacity-60"} ${className ?? ""}`}
      onClick={onClick}
      disabled={!isActive}
    >
      {text}
    </button>
  );
};

export default ButtonNavigateLarge;
