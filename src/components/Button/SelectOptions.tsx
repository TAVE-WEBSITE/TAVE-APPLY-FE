"use client";

import FlexBox from "../layout/FlexBox";

interface SelectOptionsProps<T> {
  options: T[];
  selectedOption: T;
  setSelectedOption: (option: T) => void;
}
const SelectOptions = <T extends string | undefined>({
  options,
  selectedOption,
  setSelectedOption,
}: SelectOptionsProps<T>) => {
  return (
    <FlexBox className="justify-between">
      {options.map((option) => {
        const isSelected = selectedOption === option;

        return (
          <button
            key={option}
            className={`w-[273px] h-[50px] border ${
              isSelected
                ? "border-[#195BFF80] opacity-50 bg-[#195BFF1A] opacity-10 text-[#195BFF]"
                : "border-[#E5E7EB] bg-[#FFFFFF] text-[#394150]"
            } rounded-lg cursor-pointer`}
            onClick={() => {
              setSelectedOption(option);
            }}
          >
            {option}
          </button>
        );
      })}
    </FlexBox>
  );
};

export default SelectOptions;
