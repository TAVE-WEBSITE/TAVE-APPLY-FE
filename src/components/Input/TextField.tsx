"use client";

import FlexBox from "../layout/FlexBox";

interface TextFieldProps {
  value: string;
  setValue: (value: string) => void;
  errorMessage?: string;
  label: string;
  placeholder: string;
  isRequired?: boolean;
}
const TextField = ({
  value,
  setValue,
  errorMessage,
  label,
  placeholder,
  isRequired = false,
}: TextFieldProps) => {
  return (
    <FlexBox
      className="w-full font-medium text-sm md:text-md gap-1"
      direction="col"
    >
      <label htmlFor="input-label" className="text-[#394150] md:text-lg">
        {isRequired ? (
          <FlexBox className="gap-1 items-center">
            {label}
            <span className="text-[#FF0073CC]">*</span>
          </FlexBox>
        ) : (
          `${label}`
        )}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value.trim())}
        className="w-full border border-[#E5E7EB] p-3 md:p-4 rounded-xl text-[#394150] md:text-base shadow-[0px_0px_24px_0px_#195BFF14]"
      />
    </FlexBox>
  );
};

export default TextField;
