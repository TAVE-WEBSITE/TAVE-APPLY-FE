import FlexBox from './FlexBox';

interface InputLabelProps {
    label: string;
    isRequired: boolean;
    description?: string;
}

const InputLabel = ({ label, isRequired, description }: InputLabelProps) => {
    return (
        <label className="text-[#394150]">
            {isRequired ? (
                <div className="flex flex-col md:gap-2 gap-1 md:flex-row md:items-center">
                    <FlexBox className="gap-0.5">
                        <span>{label}</span>
                        <span className="text-pink-600/80">*</span>
                    </FlexBox>
                    <span className="text-[#81818A] md:text-sm text-xs">{description}</span>
                </div>
            ) : (
                `${label}`
            )}
        </label>
    );
};

export default InputLabel;
