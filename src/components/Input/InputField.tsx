"use client";

import { useEffect, useState } from "react";

type InputType = "text" | "email" | "password" | "number";

interface InputProps<T extends string | number> {
  type?: InputType;
  value: T;
  placeholder?: string;
  setValue?: (value: T) => void;
  isPassed?: boolean;
  isError?: boolean;
  passMessage?: string;
  errorMessage?: string;
  readonly?: boolean;
  hasButton?: boolean;
  maxLength?: number;
  isCounting?: boolean;
  minuteLimit?: number;
  className?: string;
}

const InputField = <T extends string | number>({
  type = "text",
  value,
  placeholder,
  setValue,
  isPassed = false,
  isError = false,
  passMessage,
  errorMessage,
  readonly = false,
  hasButton = false,
  maxLength,
  isCounting = false,
  minuteLimit = 300,
  className,
}: InputProps<T>) => {
  const [remainingTime, setRemainingTime] = useState(minuteLimit);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCounting && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);

      if (remainingTime <= 0) {
        clearInterval(timer); // 타이머가 끝나면 멈춤
      }
    }
    return () => clearTimeout(timer);
  }, [isCounting, remainingTime]);

  const formatTime = (time: number) => {
    const minute = Math.floor(remainingTime / 60);
    const second = String(remainingTime % 60);
    return `${String(minute).padStart(2, "0")}:${second.padStart(2, "0")}`;
  };
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={(e) => {
          const val = e.target.value;
          if (type === "number" && setValue) {
            setValue(val === "" ? ("" as T) : (String(val) as T));
          } else if (setValue) {
            setValue(val as T);
          }
        }}
        readOnly={readonly}
        className={`${hasButton ? "w-[277px] md:w-[473px]" : "w-full"} border ${
          isError ? "border-red-500" : "border-[#E5E7EB]"
        } 
        ${isPassed ? "border-green-600" : "border-[#E5E7EB]"}
        p-3 md:p-4 rounded-xl text-[#394150] md:text-base shadow-[0px_0px_24px_0px_#195BFF14] ${
          readonly ? "bg-[#F3F4F6] text-[#394150] opacity-50" : ""
        } ${className}`}
      />
      {errorMessage && (
        <p className="absolute bottom-[-24px] text-sm text-red-500">
          {errorMessage}
        </p>
      )}
      {passMessage && (
        <p className="absolute bottom-[-24px] text-sm text-green-600">
          {passMessage}
        </p>
      )}
      {isCounting && (
        <p className="absolute right-0 bottom-[-24px] font-medium text-sm text-[#8CADFF]">
          {formatTime(remainingTime)}
        </p>
      )}
    </div>
  );
};

export default InputField;
