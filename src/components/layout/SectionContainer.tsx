import FlexBox from './FlexBox';

interface SectionContainerProps {
    children: React.ReactNode;
}

const SectionContainer = ({ children }: SectionContainerProps) => {
    return (
        <FlexBox
            direction="col"
            className="border border-gray-200 rounded-xl bg-white py-5 px-4 gap-3.5
            text-left font-semibold text-sm md:text-base w-full w-full"
        >
            {children}
        </FlexBox>
    );
};

export default SectionContainer;
