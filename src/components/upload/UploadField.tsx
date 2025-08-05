'use client';

import FlexBox from '@/components/layout/FlexBox';
import Icons from '@/components/Icons';
import InputField from '@/components/Input/InputField';
import Link from 'next/link';

interface UploadFieldProps {
    type: 'file' | 'text';
    value: any;
    setValue: (value: any) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const UploadField = ({ type, value, onChange, setValue }: UploadFieldProps) => {
    if (type === 'file') {
        const isUploaded = typeof value === 'string' && value !== '';

        if (!isUploaded) {
            return (
                <label
                    htmlFor="file-input"
                    className="w-full flex gap-3 p-3 md:p-4 rounded-[10px]
                    text-gray-700 bg-white border border-gray-200 cursor-pointer"
                >
                    <Icons name="upload" width={18} height={18} />
                    <span>파일 선택 (100MB 이내 PDF)</span>
                    <input id="file-input" type="file" onChange={onChange} className="hidden" />
                </label>
            );
        }

        return (
            <FlexBox
                className="w-full p-3 md:p-4 rounded-[10px] text-gray-700 bg-white
                border border-gray-200 justify-between"
            >
                <FlexBox className="gap-3">
                    <Icons name="fileGray" width={14} height={14} />
                    <Link href={value} target="_blank" rel="noopener noreferrer" className="underline">
                        파일 확인
                    </Link>
                </FlexBox>
                <button onClick={() => setValue('')} className="text-gray-400 cursor-pointer">
                    ✕
                </button>
            </FlexBox>
        );
    }

    return <InputField placeholder="ex. https://url.com" value={value} onChange={onChange} />;
};

export default UploadField;
