import FlexBox from '@/components/layout/FlexBox';

interface TimePickerProps {
    date: string;
    children: React.ReactNode;
}

const TimePicker = ({ date, children }: TimePickerProps) => {
    return (
        <FlexBox className="w-full justify-between items-center md:px-5 sm:px-2 px-1">
            <p className="text-gray-700 font-semibold text-base">{date}</p>
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 sm:gap-3 gap-2 justify-start">
                {children}
            </div>
        </FlexBox>
    );
};

export default TimePicker;
