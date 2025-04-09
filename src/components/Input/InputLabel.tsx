import FlexBox from "../layout/FlexBox";

interface InputLabelProps {
  htmlFor?: string;
  label: string;
  isRequired: boolean;
  description?: string;
}

const InputLabel = ({
  htmlFor = "input-label",
  label,
  isRequired,
  description,
}: InputLabelProps) => {
  return (
    <label htmlFor={htmlFor} className="text-[#394150] md:text-lg">
      {isRequired ? (
        <div className="flex flex-col md:gap-2 gap-1 md:flex-row items-start md:items-center">
          <div className="flex gap-1">
            <span>{label}</span>
            <span className="text-[#FF0073CC]">*</span>
          </div>
          <FlexBox className="justify-center items-start">
            <span className="text-[#81818A] md:text-sm text-xs">
              {description}
            </span>
          </FlexBox>
        </div>
      ) : (
        `${label}`
      )}
    </label>
  );
};

export default InputLabel;
