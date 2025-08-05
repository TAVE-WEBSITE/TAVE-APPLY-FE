import Icons from '@/components/Icons';

interface CheckBoxProps {
    isChecked: boolean;
    setIsChecked: (isChecked: boolean) => void;
    id: string;
}

const CheckBox = ({ isChecked, setIsChecked, id }: CheckBoxProps) => {
    return (
        <div className="md:w-6 md:h-6 w-5 h-5 relative inline-block">
            <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className={`peer appearance-none w-full h-full rounded-full border-[1.2px] border-gray-200 bg-[#F9FAFB] cursor-pointer
               checked:bg-[#1A5BFF] checked:border-[#1A5BFF]`}
            />
            <Icons
                name="check"
                width={15}
                height={15}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none"
            />
        </div>
    );
};

export default CheckBox;
