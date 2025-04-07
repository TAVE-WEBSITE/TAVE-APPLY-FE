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

  const handleClick = async () => {
    //if (!onClick) return;

    setIsLoading(true);
    new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(null);
        alert("인증요청이 전송되었습니다");
      }, 2000);
    });
  };
  return (
    <button
      className={`w-[76px] h-[42px] bg-[#212225] ${
        isActive ? "" : "opacity-40"
      } rounded-lg text-white font-bold cursor-pointer flex justify-center items-center`}
      onClick={handleClick}
    >
      {isLoading ? <LoadingSpinner /> : text}
    </button>
  );
};

export default ButtonAuth;
