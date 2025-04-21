import { Dispatch, SetStateAction, useEffect } from "react";
import FlexBox from "./layout/FlexBox";

interface ToastMessageProps {
  message: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const ToastMessage = ({ message, isOpen, setIsOpen }: ToastMessageProps) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setIsOpen(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen, setIsOpen]);
  return (
    <div
      className={`fixed top-1/4 md:top-auto md:bottom-16 left-1/2 transform -translate-x-1/2 z-99 duration-700 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-[320px] md:w-[340px] rounded-3xl font-bold text-[#195BFF] bg-[#195BFF14] bg-opacity-50">
        <FlexBox className="justify-center items-center gap-2 p-2 md:py-3 md:px-5">
          <svg
            width="20"
            height="20"
            viewBox="0 0 64 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M58.6673 30.2818V32.7352C58.664 38.4856 56.802 44.081 53.3589 48.6867C49.9158 53.2924 45.0761 56.6618 39.5616 58.2922C34.0471 59.9227 28.1533 59.7269 22.7592 57.734C17.3651 55.7412 12.7597 52.0581 9.62988 47.234C6.50003 42.4099 5.01343 36.7033 5.39179 30.9653C5.77015 25.2273 7.9932 19.7654 11.7294 15.394C15.4656 11.0227 20.5147 7.97617 26.1238 6.70888C31.7329 5.44158 37.6014 6.02138 42.854 8.36182"
              stroke="#195BFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M58.6667 11.4023L32 38.0957L24 30.0957"
              stroke="#195BFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <span className="text-sm mg:text-lg">{message}</span>
        </FlexBox>
      </div>
    </div>
  );
};

export default ToastMessage;
