import { useState, useEffect, useRef } from 'react';
import FlexBox from '../layout/FlexBox';
import UploadField from './UploadField';

type UploaderProps = {
    options: string[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
    uploadType: 'text' | 'file';
    onSaveUpload: (option: string) => Promise<number | 'error'>; // 수정
    uploadValues: { [key: string]: string | File };
    children: React.ReactNode;
};

const Uploader = ({
    options,
    selectedOption,
    setSelectedOption,
    onSaveUpload,
    uploadValues,
    children,
}: UploaderProps) => {
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (option: string) => {
        setSelectedOption(option);
        setSaveStatus('idle'); // 탭 바꾸면 상태 초기화
        if (resetTimerRef.current) {
            clearTimeout(resetTimerRef.current);
        }
    };

    const handleSave = async () => {
        try {
            const result = await onSaveUpload(selectedOption);
            if (result === 200) {
                setSaveStatus('success');

                // 3초 후 다시 'idle'로 변경
                resetTimerRef.current = setTimeout(() => {
                    setSaveStatus('idle');
                }, 3000);
            } else {
                setSaveStatus('error');
            }
        } catch {
            setSaveStatus('error');
        }
    };

    // 컴포넌트 언마운트 시 타이머 제거
    useEffect(() => {
        return () => {
            if (resetTimerRef.current) {
                clearTimeout(resetTimerRef.current);
            }
        };
    }, []);

    return (
        <FlexBox direction="col" className="w-full gap-4">
            <FlexBox className="w-full justify-between text-gray-400 font-medium">
                {options.map((option) => (
                    <button
                        key={option}
                        className={`border border-gray-300 rounded-lg py-2 px-4 cursor-pointer hover:bg-[#E9EFFF] cursor-pointer ${
                            selectedOption === option ? 'border-[#C8D7FF] text-[#376DFF] bg-[#E9EFFF]' : ''
                        }`}
                        onClick={() => handleChange(option)}
                    >
                        {option}
                    </button>
                ))}
            </FlexBox>
            {children}
            <button
                type="button"
                className={`mx-auto px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:text-gray-500 rounded-xl font-bold  cursor-pointer
                     ${saveStatus === 'success' ? 'text-[#8D95A0] bg-[#E5E7EB]' : 'bg-blue-600 text-white'}`}
                onClick={handleSave}
            >
                {saveStatus === 'success' ? '저장 완료' : '저장하기'}
            </button>
        </FlexBox>
    );
};

Uploader.UploadField = UploadField;

export default Uploader;
