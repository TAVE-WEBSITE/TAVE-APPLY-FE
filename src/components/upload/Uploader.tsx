'use client';

import FlexBox from '@/components/layout/FlexBox';
import UploadField from '@/components/upload/UploadField';

interface UploaderProps {
    options: string[];
    selectedOption: string;
    children: React.ReactNode;
    onSaveUpload: () => void;
    onOptionChange: (option: string) => void;
    saveStatus: 'idle' | 'success' | 'error';
}

const Uploader = ({ options, selectedOption, onSaveUpload, onOptionChange, children, saveStatus }: UploaderProps) => {
    return (
        <FlexBox direction="col" className="w-full gap-4 md:text-base text-sm">
            <FlexBox className="w-full justify-between font-medium">
                {options.map((option) => (
                    <button
                        key={option}
                        className={`border rounded-[10px] py-2 px-3 cursor-pointer ${
                            selectedOption === option
                                ? 'border-indigo-200 text-[#376DFF] bg-indigo-50'
                                : 'text-[#B0B3B9] border-[#E5E7EB] bg-white'
                        }`}
                        onClick={() => onOptionChange(option)}
                    >
                        {option}
                    </button>
                ))}
            </FlexBox>
            {children}
            <button
                className={`mx-auto px-4 py-2 rounded-[10px] font-bold
                     ${
                         saveStatus === 'idle'
                             ? 'bg-blue-600 text-white cursor-pointer'
                             : 'bg-gray-200 text-zinc-400 cursor-not-allowed'
                     }`}
                onClick={onSaveUpload}
            >
                {saveStatus === 'success' ? '저장 완료' : saveStatus === 'error' ? '저장 실패' : '저장하기'}
            </button>
        </FlexBox>
    );
};

Uploader.UploadField = UploadField;

export default Uploader;
