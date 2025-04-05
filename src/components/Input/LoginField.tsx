import FlexBox from "../layout/FlexBox";

interface LoginFieldProps {
  value: string;
  setValue: (value: string) => void;
  errorMessage?: string;
  label: string;
  placeholder: string;
}

const LoginField = ({
  value,
  setValue,
  errorMessage,
  label,
  placeholder,
}: LoginFieldProps) => {
  return (
    <FlexBox
      className="w-full font-medium text-sm md:text-md gap-1"
      direction="col"
    >
      <label htmlFor="input-label" className="text-[#394150] md:text-lg">
        {label}
      </label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value.trim())}
        className="w-full border border-[#E5E7EB] p-3 md:p-4 rounded-xl text-[#394150] md:text-base"
      />
      <span className="text-sm text-[#FF0073CC]">* {errorMessage}</span>
    </FlexBox>
  );
};

export default LoginField;
