import { IconKeys, Icons } from "./Icons";
import FlexBox from "./layout/FlexBox";

interface RectangleProps {
  iconName: IconKeys;
  title: string;
  description: string;
  extra?: string;
}

const Rectangle = ({ iconName, title, description, extra }: RectangleProps) => {
  return (
    <FlexBox
      className="w-[303px] h-[214px] bg-[rgba(128,134,148,0.2)] rounded-2xl gap-y-6 justify-center items-center"
      direction="col"
    >
      <FlexBox className="rounded-full w-[56px] h-[56px] bg-[#F0F6FE] bg-opacity-20 justify-center">
        <Icons name={iconName} width={33} height={33} />
      </FlexBox>
      <FlexBox className="justify-center items-center" direction="col">
        <p className="text-white font-bold text-[28px]">{title}</p>
        <p className="text-[#A0A7B4] text-xl">{description}</p>
        <p className="text-sm text-[#A0A7B4] opacity-50">{extra}</p>
      </FlexBox>
    </FlexBox>
  );
};

export default Rectangle;
