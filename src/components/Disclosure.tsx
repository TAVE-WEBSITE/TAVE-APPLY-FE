"use client";

import { useEffect, useRef, useState } from "react";
import FlexBox from "@/components/layout/FlexBox";
import Icons from "./Icons";

interface DisclosureProps {
  title: string;
  description?: string;
  isRequired?: boolean;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

const Disclosure = ({
  title,
  description,
  isRequired = false,
  defaultOpen = true,
  children,
}: DisclosureProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight;
      if (isOpen) {
        contentRef.current.style.maxHeight = `${contentHeight}px`;
      } else {
        contentRef.current.style.maxHeight = "0px";
      }
    }
  }, [isOpen]);

  return (
    <FlexBox
      direction="col"
      className="rounded-[20px] border border-gray-200 p-6"
    >
      <FlexBox className="justify-between items-center text-[#394150] font-normal leading-snug text-sm md:text-base">
        <p className="font-semibold">{title}</p>
        {description}
        {isRequired && <p className="text-[#FF0073CC]">*</p>}
        <button onClick={handleToggle} className="cursor-pointer">
          <Icons
            name="arrow"
            width={24}
            height={24}
            className={`duration-500 ${isOpen && "rotate-180"}`}
          />
        </button>
      </FlexBox>
      <div ref={contentRef} className="overflow-hidden duration-500">
        <div className="w-full h-px bg-gray-200 my-5" />
        {children}
      </div>
    </FlexBox>
  );
};

export default Disclosure;
