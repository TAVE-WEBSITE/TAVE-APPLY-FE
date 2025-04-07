import FlexBox from "./layout/FlexBox";

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
        <FlexBox className="gap-1 items-center">
          {label}
          <span className="text-[#FF0073CC]">*</span>
          <span className="text-[#81818A] ml-2 text-sm">{description}</span>
        </FlexBox>
      ) : (
        `${label}`
      )}
    </label>
  );
};

export default InputLabel;
