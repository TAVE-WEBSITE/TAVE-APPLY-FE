'use client';

interface TextAreaProps<T extends string | number> {
    value: T;
    setValue: (value: T) => void;
    maxLength: number;
    placeholder?: string;
}

const TextArea = <T extends string | number>({ value, setValue, placeholder, maxLength }: TextAreaProps<T>) => {
    return (
        <textarea
            value={value}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(e) => {
                const val = e.target.value;
                setValue(val as T);
            }}
            className={`w-full border border-gray-200 resize-none font-medium
        p-3 md:p-4 rounded-[10px] text-gray-700 md:text-base text-sm bg-white
        focus:outline-none focus:shadow-[0px_0px_24px_0px_#195BFF14]
        focus:border-blue-600/50 placeholder:text-[#B0B3B9] 
       ${maxLength >= 300 ? 'h-[250px]' : 'h-[180px] md:h-[160px]'}`}
        />
    );
};

export default TextArea;
