import FlexBox from '../layout/FlexBox';
import UploadField from './UploadField';

type UploaderProps = {
    options: string[];
    selectedOption: string;
    setSelectedOption: (option: string) => void;
    setUploadType: (type: any) => void;
    onSaveUpload: (option: string) => Promise<void>; // 저장 함수 prop 추가
    uploadValues: { [key: string]: string | File }; // 현재 값 상태
    children: React.ReactNode;
};

const Uploader = ({
    options,
    selectedOption,
    setSelectedOption,
    setUploadType,
    onSaveUpload,
    uploadValues,
    children,
}: UploaderProps) => {
    const handleChange = (option: string) => {
        if (option === 'Portfolio') {
            setUploadType('file');
        } else {
            setUploadType('text');
        }
        setSelectedOption(option);
    };

    return (
        <FlexBox direction="col" className="w-full gap-4">
            <FlexBox className="w-full justify-between text-gray-400 font-medium">
                {options.map((option) => (
                    <button
                        key={option}
                        className={`border border-gray-300 rounded-lg py-2 px-4 cursor-pointer hover:bg-[#E9EFFF] ${
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
                className="mx-auto px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300 disabled:text-gray-500 rounded-xl font-bold"
                disabled={
                    !uploadValues[selectedOption] ||
                    (uploadValues[selectedOption] instanceof File && uploadValues[selectedOption].size === 0)
                }
                onClick={() => onSaveUpload(selectedOption)}
            >
                저장하기
            </button>
        </FlexBox>
    );
};

Uploader.UploadField = UploadField;

export default Uploader;
