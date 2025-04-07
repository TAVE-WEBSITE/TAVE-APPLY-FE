type InputType = "text" | "email" | "password" | "number";
type InputSize = "w-[473px]" | "w-full";

interface InputProps {
  type?: InputType;
  width?: InputSize;
  value: string;
  placeholder?: string;
  setValue: (value: string) => void;
  onBlur?: () => void;
  isError?: boolean;
  errorMessage?: string;
  readonly?: boolean;
  className?: string;
}

const InputField = ({
  type = "text",
  value,
  width = "w-full",
  placeholder,
  setValue,
  onBlur,
  isError = false,
  errorMessage,
  readonly = false,
  className,
}: InputProps) => {
  return (
    <>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value.trim())}
        onBlur={onBlur}
        readOnly={readonly}
        className={`${width} border ${
          isError ? "border-red-500" : "border-[#E5E7EB]"
        } p-3 md:p-4 rounded-xl text-[#394150] md:text-base shadow-[0px_0px_24px_0px_#195BFF14] ${className}`}
      />
      <p className="absolute bottom-[-24px] text-sm text-red-500">
        {errorMessage}
      </p>
    </>
  );
};

export default InputField;
