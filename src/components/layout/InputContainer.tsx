import InputLable from "../Input/InputLabel";
import FlexBox from "./FlexBox";

interface InputContainerProps {
  children: React.ReactNode;
  label: string;
  isRequired?: boolean;
  description?: string;
}

const InputContainer = ({
  children,
  label,
  isRequired,
  description,
}: InputContainerProps) => {
  return (
    <FlexBox
      className="w-full font-medium text-sm md:text-md gap-1 relative"
      direction="col"
    >
      <InputLable
        label={label}
        isRequired={isRequired ? isRequired : false}
        description={description}
      />
      {children}
    </FlexBox>
  );
};

export default InputContainer;
