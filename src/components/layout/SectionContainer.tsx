import FlexBox from '@/components/layout/FlexBox';

interface SectionContainerProps {
    children: React.ReactNode;
    direction?: 'row' | 'col';
}

const SectionContainer = ({ children, direction = 'row' }: SectionContainerProps) => {
    return (
        <FlexBox
            direction={direction}
            className={`${direction === 'col' ? 'gap-3.5' : 'md:gap-2 gap-1'} border border-gray-200 rounded-xl
            bg-white p-4 text-left font-semibold text-sm md:text-base w-full`}
        >
            {children}
        </FlexBox>
    );
};

export default SectionContainer;
