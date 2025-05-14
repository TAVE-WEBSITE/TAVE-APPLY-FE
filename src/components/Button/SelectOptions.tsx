"use client";

import FlexBox from "../layout/FlexBox";

interface tionsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
}
const SelectOptions = ({
  options,
  selectedOption,
  setSelectedOption,
}: SelectOptionsProps) => {
  return (
    <FlexBox className="justify-between">
      {options.map((option) => {
        const isSelected = selectedOption === option;

        return (
          <button
            key={option}
            className={`md:w-[273px] w-[167px] h-[50px] border ${
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
