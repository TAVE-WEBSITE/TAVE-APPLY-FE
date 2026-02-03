import FlexBox from '@/components/layout/FlexBox';

interface CardTargetProps {
    title: string;
    description: string;
}

const CardTarget = ({ title, description }: CardTargetProps) => {
    return (
        <FlexBox
            direction="col"
            className="md:w-[305px] w-[230px] bg-[#292B30] rounded-[10px] md:gap-y-4
            gap-y-2.5 items-center md:py-7 py-5 text-center"
        >
            <p className="font-bold md:text-xl text-base">{title}</p>
            <div className="h-px bg-[#44495D] w-5" />
            <p className="md:text-base text-xs whitespace-pre-line">{description}</p>
        </FlexBox>
    );
};

export default CardTarget;
