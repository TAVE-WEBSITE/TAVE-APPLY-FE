'use client';

import React, { useContext } from 'react';
import { SelectContext } from '@/components/select/Select';
import Icons from '@/components/Icons';

interface SelectTriggerProps {
    children: React.ReactNode;
}

const Trigger = ({ children }: SelectTriggerProps) => {
    const selectContext = useContext(SelectContext);
    if (!selectContext) throw new Error('SelectTrigger must be used within Select');

    const { selectedValue, isOpen, setIsOpen } = selectContext;

    return (
        <div className="relative">
            <button
                className="w-full flex justify-between border border-gray-200 text-start
                p-3 md:p-4 rounded-xl text-gray-700 bg-white cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValue}
                <Icons name="arrow" width={20} height={20} />
            </button>
            {isOpen && children}
        </div>
    );
};

export default Trigger;
