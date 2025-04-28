import Icons, { IconKeys } from '../Icons';
import FlexBox from '@/components/layout/FlexBox';

interface CardScheduleProps {
    iconName: IconKeys;
    title: string;
    description: string;
    extra?: string;
}

const CardSchedule = ({ iconName, title, description, extra }: CardScheduleProps) => {
    return (
        <FlexBox
            direction="col"
            className="md:w-[217px] md:h-[175px] sm:w-[190px] sm:h-[160px] w-[150px] h-[155px]
            bg-[#7f859333] rounded-2xl md:gap-y-4 gap-y-2.5 items-center pt-7.5"
        >
            <div className="rounded-full p-2.5 bg-[#F0F6FE]">
                <Icons name={iconName} width={24} height={24} />
            </div>
            <FlexBox direction="col" className="items-center">
                <p className="font-bold md:text-xl text-base">{title}</p>
                <p className="text-[#9fa7b3] md:text-base sm:text-sm text-xs mt-0.5">{description}</p>
                <p className="md:text-sm text-xs text-[#A0A7B4] opacity-50">{extra}</p>
            </FlexBox>
        </FlexBox>
    );
};

export default CardSchedule;
