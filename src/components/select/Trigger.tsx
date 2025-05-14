import React, { useContext } from "react";
import { SelectContext } from "./Select";
import Icons from "../Icons";

interface SelectTriggerProps {
  children?: React.ReactNode;
}

const Trigger: React.FC<SelectTriggerProps> = ({ children }) => {
  const selectContext = useContext(SelectContext);
  if (!selectContext)
    throw new Error("SelectTrigger must be used within Select");

  const { selectedValue, isOpen, setIsOpen } = selectContext;

  return (
    <div className="relative">
      <button
        className="w-full flex justify-between border border-[#E5E7EB] text-start p-3 md:p-4 rounded-xl text-[#394150] md:text-base shadow-[0px_0px_24px_0px_#195BFF14]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue}
        <Icons name="arrow" width={20} height={20} className="" />
      </button>
      {isOpen && children}
    </div>
  );
};

export default Trigger;
