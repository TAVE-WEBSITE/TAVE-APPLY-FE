import FlexBox from '@/components/layout/FlexBox';
import Icons from '@/components/Icons';
import { RecruitField } from '@/modules/recruitType';
import { useContext } from 'react';
import { SelectContext } from '@/components/select/Select';

interface OptionProps<T> {
    value: T;
}

const Option: React.FC<OptionProps<RecruitField>> = ({ value }) => {
    const selectContext = useContext(SelectContext);
    if (!selectContext) throw new Error('SelectTrigger must be used within Select');

    const { selectedValue, setSelectedValue, setIsOpen } = selectContext;

    const handleSelectOption = () => {
        setSelectedValue(value);
        setIsOpen(false);
    };

    const isSelected = selectedValue === value;

    return (
        <li className="bg-white flex gap-4 p-4 hover:bg-gray-50 rounded-xl cursor-pointer" onClick={handleSelectOption}>
            {isSelected ? (
                <>
                    <FlexBox className="justify-center items-center border-2 border-[#4584EE] rounded-full w-5 h-5">
                        <Icons name="circle" width={10} height={10} />
                    </FlexBox>
                    {value}
                </>
            ) : (
                <>
                    <div className="border-2 border-[#E5E7EB] rounded-full w-5 h-5" />
                    {value}
                </>
            )}
        </li>
    );
};

export default Option;
