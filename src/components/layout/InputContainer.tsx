import InputLabel from "@/components/layout/InputLabel";
import FlexBox from "@/components/layout/FlexBox";
 
interface InputContainerProps {
  children: React.ReactNode;
  label: string;
  isRequired?: boolean;
  description?: string;
  isStress?: boolean;
}
 
const InputContainer = ({
  children,
  label,
  isRequired = true,
  description,
  isStress = false
}: InputContainerProps) => {
  return (
    <FlexBox
      className="font-medium md:text-base text-sm gap-1.5"
      direction="col"
    >
      <InputLabel
        label={label}
        isRequired={isRequired}
        description={description}
        isStress={isStress}
      />
      {children}
    </FlexBox>
  );
};

export default InputContainer;
