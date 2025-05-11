import FlexBox from "../layout/FlexBox";
import UploadField from "./UploadField";

type UploaderProps = {
  options: string[];
  selectedOption: string;
  setSelectedOption: (option: string) => void;
  setUploadType: (type: any) => void;
  children: React.ReactNode;
};

const Uploader = ({
  options,
  selectedOption,
  setSelectedOption,
  setUploadType,
  children,
}: UploaderProps) => {
  const handleChange = (option: string) => {
    if (option === "Portfolio") {
      setUploadType("file");
    } else {
      setUploadType("text");
    }
    setSelectedOption(option);
  };

  return (
    <FlexBox direction="col" className="w-full gap-4">
      <FlexBox className="w-full justify-between text-gray-400 font-medium">
        {options.map((option) => (
          <button
            key={option}
            className={`border border-gray-300 rounded-lg py-2 px-4 cursor-pointer hover:bg-[#E9EFFF] ${
              selectedOption === option
                ? "border-[#C8D7FF] text-[#376DFF] bg-[#E9EFFF]"
                : ""
            }`}
            onClick={() => handleChange(option)}
          >
            {option}
          </button>
        ))}
      </FlexBox>
      {children}
    </FlexBox>
  );
};

Uploader.UploadField = UploadField;

export default Uploader;
