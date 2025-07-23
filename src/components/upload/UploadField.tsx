import { useRef } from 'react';
import FlexBox from '../layout/FlexBox';
import Icons from '../Icons';

interface UploadFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    value: any;
    setValue: (value: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function UploadField({ type = 'text', value, onChange, setValue }: UploadFieldProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    if (type === 'file') {
        const isUploaded = typeof value === 'string' && value !== '';

        return (
            <FlexBox className="items-center gap-3 border border-[#E5E7EB] rounded-xl px-4 py-3 md:py-4 w-full justify-between">
                <FlexBox className="items-center gap-3">
                    <Icons name={isUploaded ? 'fileGray' : 'upload'} width={20} height={20} />
                    {isUploaded ? (
                        <a
                            href={value}
                            download
                            className="text-[#394150] underline hover:text-blue-600 text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            파일 확인
                        </a>
                    ) : (
                        <>
                            <label htmlFor="file-input" className="text-[#394150] md:text-base cursor-pointer">
                                {value?.name ? value.name : '파일 선택'}
                            </label>
                            <input id="file-input" ref={inputRef} type="file" onChange={onChange} className="hidden" />
                        </>
                    )}
                </FlexBox>

                {isUploaded && (
                    <button
                        onClick={() => setValue('')}
                        type="button"
                        className="text-gray-400 hover:text-red-500 text-sm"
                    >
                        ✕
                    </button>
                )}
            </FlexBox>
        );
    }

    return (
        <input
            type={type}
            ref={inputRef}
            className="w-full border border-[#E5E7EB] p-3 md:p-4 rounded-xl text-[#394150] md:text-base cursor-pointer"
            placeholder={type === 'text' ? 'ex. https://github.com/yourname' : ''}
            value={value}
            onChange={onChange}
        />
    );
}
