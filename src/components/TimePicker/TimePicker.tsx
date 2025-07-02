'use client';

import { useState } from 'react';
import TimeSlotButton from './TimeSlotButton';
import { TimeSlotButtonProps } from './TimeSlotButton';

interface TimePickerProps {
    children: React.ReactNode;
}

interface DateRowProps {
    date: string;
    children: React.ReactNode;
}

function TimePicker({ children }: TimePickerProps) {
    return (
        <div className="max-w-4xl mx-auto px-4 rounded-lg">
            <div className="rounded-lg">{children}</div>
        </div>
    );
}

// 날짜 행 컴포넌트
const DateRow = ({ date, children }: DateRowProps) => {
    return (
        <div className="flex border-b border-gray-200 py-4 text-[#394150]">
            <div className="w-32 flex flex-col justify-center font-semibold">
                <div>{date}</div>
            </div>
            <div className="flex flex-wrap gap-4 justify-end">{children}</div>
        </div>
    );
};

// TimePicker 확장 타입
type TimePickerType = React.FC<TimePickerProps> & {
    DateRow: React.FC<DateRowProps>;
    TimeSlotButton: React.FC<TimeSlotButtonProps>;
};

TimePicker.DateRow = DateRow;
TimePicker.TimeSlotButton = TimeSlotButton;

export default TimePicker as TimePickerType;
