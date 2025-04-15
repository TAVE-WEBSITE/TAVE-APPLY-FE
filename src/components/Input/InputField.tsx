import { Dispatch, SetStateAction } from "react";

type InputType = "text" | "email" | "password" | "number";

interface InputProps<T extends string | number> {
  type?: InputType;
  value: T;
  placeholder?: string;
  setValue?: (value: T) => void;
  isError?: boolean;
  errorMessage?: string;
  readonly?: boolean;
  hasButton?: boolean;
  maxLength?: number;
  isTimerActive?: boolean;
  timeLeft?: number;
  className?: string;
}

const InputField = <T extends string | number>({
  type = "text",
  value,
  placeholder,
  setValue,
  isError = false,
  errorMessage,
  readonly = false,
  hasButton = false,
  maxLength,
  isTimerActive = false,
  timeLeft = 300,
  className,
}: InputProps<T>) => {
  return (
    <>
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
        } p-3 md:p-4 rounded-xl text-[#394150] md:text-base shadow-[0px_0px_24px_0px_#195BFF14] ${className}`}
      />
      <p className="absolute bottom-[-24px] text-sm text-red-500">
        {errorMessage}
      </p>
    </>
  );
};

export default InputField;
