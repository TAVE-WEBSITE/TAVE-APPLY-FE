import { RecruitField } from "@/store/recruitStore";

interface SelectOptionProp<T> {
  children: React.ReactNode;
}

const Options: React.FC<SelectOptionProp<RecruitField>> = ({ children }) => {
  return (
    <ul className="absolute z-99 mt-2 w-full flex flex-col border border-[#E5E7EB] bg-white p-2 rounded-xl text-[#394150]">
      {children}
    </ul>
  );
};

export default Options;
