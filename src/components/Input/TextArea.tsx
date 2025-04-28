"use client";

import { TextareaHTMLAttributes } from "react";

interface TextAreaProps<T extends string | number>
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  value: T;
  placeholder?: string;
  setValue?: (value: T) => void;
  readonly?: boolean;
  maxLength: number;
  className?: string;
}

const TextArea = <T extends string | number>({
  value,
  placeholder,
  setValue,
  readonly = false,
  maxLength,
  className,
}: TextAreaProps<T>) => {
  return (
    <textarea
      value={value}
      placeholder={placeholder}
      maxLength={maxLength}
      onChange={(e) => {
        const val = e.target.value;
        if (setValue) {
          setValue(val as T);
        }
      }}
      readOnly={readonly}
      className={`w-full h-[158px] border border-[#E5E7EB]
        p-3 md:p-4 rounded-xl text-[#394150] md:text-base shadow-[0px_0px_24px_0px_#195BFF14] ${
          readonly ? "bg-[#F3F4F6] text-[#394150] opacity-50" : ""
        } ${className}`}
    />
  );
};

export default TextArea;
