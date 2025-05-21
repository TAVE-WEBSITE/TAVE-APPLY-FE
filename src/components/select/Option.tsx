import Image from "next/image";
import FlexBox from "../layout/FlexBox";
import { RecruitField } from "@/modules/recruitType";
import { useContext } from "react";
import { SelectContext } from "./Select";

interface OptionProps<T> {
  value: T;
}
const Option: React.FC<OptionProps<RecruitField>> = ({ value }) => {
  const selectContext = useContext(SelectContext);
  if (!selectContext)
    throw new Error("SelectTrigger must be used within Select");

  const { selectedValue, setSelectedValue, setIsOpen } = selectContext;

  const handleSelectOption = (value: RecruitField) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  let isSelected = selectedValue === value;

  return (
    <li
      className="bg-white flex gap-4 p-4 hover:bg-gray-50"
      onClick={() => handleSelectOption(value)}
    >
      {isSelected ? (
        <>
          <FlexBox className="justify-center items-center border-2 border-[#4584EE] rounded-full w-5 h-5">
            <Image src="/circle.svg" alt="option" width={10} height={10} />
          </FlexBox>
          {value}
        </>
      ) : (
        <>
          <div className="justify-center items-center border-2 border-[#E5E7EB] rounded-full w-5 h-5" />
          {value}
        </>
      )}
    </li>
  );
};

export default Option;
