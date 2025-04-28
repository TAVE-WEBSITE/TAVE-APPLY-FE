import FlexBox from '@/components/layout/FlexBox';

interface CardChipProps {
    title: string;
    description: string;
}

const CardChip = ({ title, description }: CardChipProps) => {
    return (
        <FlexBox
            direction="col"
            className="w-[150px] sm:w-[190px] md:w-[225px] py-4 bg-[#7f8593]/20
            rounded-2xl md:gap-y-3.5 gap-y-2.5 md:px-4.5 px-3.5"
        >
            <p className="font-semibold md:text-lg text-base">{title}</p>
            <div className="h-px bg-[#3E3F42] w-full" />
            <p className="md:text-base text-sm text-[#9fa7b3] font-medium">{description}</p>
        </FlexBox>
    );
};

export default CardChip;
