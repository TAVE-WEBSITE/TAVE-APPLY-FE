"use client";

import { useState } from "react";
import LoadingSpinner from "../LoadingSpinner";

interface ButtonAuthProps {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
}

const ButtonAuth = ({ text, isActive = true, onClick }: ButtonAuthProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick();
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <button
      className={`md:w-[76px] w-[61px] h-[42px] md:text-sm text-xs bg-[#212225] cursor-pointer ${
        isActive ? "cursor-pointer" : "opacity-40 cursor-not-allowed"
      } rounded-lg text-white font-bold flex justify-center items-center`}
      onClick={handleClick}
    >
      {isLoading ? <LoadingSpinner /> : text}
    </button>
  );
};

export default ButtonAuth;
