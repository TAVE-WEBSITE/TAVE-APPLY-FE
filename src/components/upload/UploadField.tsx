import { useRef, useState } from "react";
import FlexBox from "../layout/FlexBox";
import Icons from "../Icons";

interface UploadFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value: any;
  setValue: (value: any) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadField({
  type = "text",
  value,
  onChange,
}: UploadFieldProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState("");

  if (type === "file") {
    return (
      <FlexBox className="items-center gap-3 border border-[#E5E7EB] rounded-xl px-4 py-3 md:py-4 cursor-pointer w-full">
        <Icons
          name={`${fileName ? "fileGray" : "upload"}`}
          width={20}
          height={20}
        />
        <label
          htmlFor="file-input"
          className="text-[#394150] md:text-base cursor-pointer"
        >
          {value.name ? value.name : "파일 선택"}
        </label>
        <input
          id="file-input"
          ref={inputRef}
          type="file"
          onChange={onChange}
          className="hidden"
        />
      </FlexBox>
    );
  }

  return (
    <input
      type={type}
      ref={inputRef}
      className="w-full border border-[#E5E7EB] p-3 md:p-4 rounded-xl text-[#394150] md:text-base cursor-pointer"
      placeholder={`${type === "text" ? "ex. https://github/1223" : ""}`}
      value={value}
      onChange={onChange}
    />
  );
}
