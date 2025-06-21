import InputLabel from "./InputLabel";
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
  isRequired = true,
  description,
}: InputContainerProps) => {
  return (
    <FlexBox
      className="font-medium md:text-base text-sm gap-1"
      direction="col"
    >
      <InputLabel
        label={label}
        isRequired={isRequired}
        description={description}
      />
      {children}
    </FlexBox>
  );
};

export default InputContainer;
