import FlexBox from './FlexBox';

interface EnterContainerProps {
    label: string;
    children?: React.ReactNode;
    description?: string;
    mode?: 'default' | 'light' | 'deep';
}

const modeStyle = {
    default: 'border-gray-200 bg-white text-black',
    light: 'text-[#2553ff] bg-[#E8EDFB] border-[#C1CEFC]',
    deep: 'bg-[#2553ff] border-[#2553ff] text-white',
};

const EnterContainer = ({ children, label, description, mode = 'default' }: EnterContainerProps) => {
    return (
        <FlexBox direction="col" className={`w-full h-full justify-center border rounded-xl py-3 ${modeStyle[mode]}`}>
            <p className="font-bold opacity-60">{label}</p>
            {description ? <p className="mt-1">{description}</p> : children}
        </FlexBox>
    );
};

export default EnterContainer;
