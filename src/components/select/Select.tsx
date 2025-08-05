'use client';

import { useState, createContext } from 'react';
import Trigger from '@/components/select/Trigger';
import Options from '@/components/select/Options';
import Option from '@/components/select/Option';

interface SelectContextType {
    selectedValue: any;
    setSelectedValue: (value: any) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export const SelectContext = createContext<SelectContextType | undefined>(undefined);

interface SelectProps {
    selectedValue: any;
    setSelectedValue: (value: any) => void;
    children: React.ReactNode;
}

const Select = ({ selectedValue, setSelectedValue, children }: SelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <SelectContext.Provider value={{ selectedValue, setSelectedValue, isOpen, setIsOpen }}>
            {children}
        </SelectContext.Provider>
    );
};

Select.Trigger = Trigger;
Select.Options = Options;
Select.Option = Option;

export default Select;
