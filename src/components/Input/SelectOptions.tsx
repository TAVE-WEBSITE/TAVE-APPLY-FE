'use client';

import FlexBox from '@/components/layout/FlexBox';

interface SelectOptionsProps {
    options: string[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
}

const SelectOptions = ({ options, selectedOption, setSelectedOption }: SelectOptionsProps) => {
    return (
        <FlexBox className="justify-between gap-3">
            {options.map((option) => {
                const isSelected = selectedOption === option;
                return (
                    <button
                        key={option}
                        className={`w-full py-3 border rounded-lg cursor-pointer ${
                            isSelected
                                ? 'border-blue-600/50 text-blue-600 bg-blue-600/10'
                                : 'border-gray-200 bg-white text-gray-700/60'
                        }`}
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
