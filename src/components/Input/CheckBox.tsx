interface CheckBoxProps {
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  className?: string;
}

const CheckBox = ({
  isChecked = false,
  setIsChecked,
  className,
}: CheckBoxProps) => {
  return (
    <label htmlFor="" className="w-6 h-6 relative inline-block">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        className={`peer appearance-none w-full h-full rounded-full border-[1.2px] border-[#E5E7EB] bg-[#F9FAFB] cursor-pointer
               checked:bg-[#1A5BFF] checked:border-[#1A5BFF] ${className}`}
      />
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 8.33333L6.33333 11.6667L13 5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </label>
  );
};

export default CheckBox;
