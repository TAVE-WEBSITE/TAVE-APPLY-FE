import FlexBox from './FlexBox';

interface InputLabelProps {
    label: string;
    isRequired: boolean;
    description?: string;
    isStress?: boolean;
}

const InputLabel = ({ label, isRequired, description, isStress = false }: InputLabelProps) => {
    return (
        <label className="text-[#394150]">
            {isRequired ? (
                <div className="flex flex-col md:gap-2 gap-0.5 md:flex-row md:items-center">
                    <FlexBox className="gap-0.5">
                        <span>{label}</span>
                        <span className="text-pink-600/80">*</span>
                    </FlexBox>
                    {description && (
                        <span className={` md:text-sm text-xs ${isStress ? 'text-pink-600/80' : 'text-[#81818A]'}`}>
                            {description}
                        </span>
                    )}
                </div>
            ) : (
                `${label}`
            )}
        </label>
    );
};

export default InputLabel;
