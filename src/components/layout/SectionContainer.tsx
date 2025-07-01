import FlexBox from '@/components/layout/FlexBox';

interface SectionContainerProps {
    children: React.ReactNode;
    direction?: 'row' | 'col';
    type?: 'recruit' | 'outcome';
}

const SectionContainer = ({ children, direction = 'row', type = 'outcome' }: SectionContainerProps) => {
    return (
        <FlexBox
            direction={direction}
            className={`${direction === 'col' ? 'gap-3.5' : 'md:gap-2 gap-1'}
            ${type === 'outcome' ? 'text-sm md:text-base' : 'text-[13px] md:text-[15px]'}
            border border-gray-200 rounded-xl bg-white p-4 text-left font-semibold`}
        >
            {children}
        </FlexBox>
    );
};

export default SectionContainer;
