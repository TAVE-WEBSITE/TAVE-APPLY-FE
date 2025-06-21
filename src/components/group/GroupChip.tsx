'use client';

import CardChip from '@/components/card/CardChip';
import FlexBox from '@/components/layout/FlexBox';
import ButtonChip from '@/components/Button/ButtonChip';
import { SessionGrouped, SessionChip } from '@/modules/homeType';
import { useState } from 'react';

interface GroupChipProps {
    sessions: SessionGrouped;
}

const GroupChip = ({ sessions }: GroupChipProps) => {
    const [activeChip, setActiveChip] = useState<SessionChip>('START');
    const items = sessions[activeChip];

    const chips: { label: string; value: SessionChip }[] = [
        { label: 'START', value: 'START' },
        { label: 'PART 1', value: 'PART1' },
        { label: 'PART 2', value: 'PART2' },
    ];

    const rows = [];
    for (let i = 0; i < items.length; i += 3) {
        rows.push(items.slice(i, i + 3));
    }

    return (
        <FlexBox direction="col" className="gap-10 mt-5">
            <FlexBox className="md:gap-6 gap-4 justify-center">
                {chips.map(({ label, value }) => (
                    <ButtonChip
                        key={value}
                        text={label}
                        onClick={() => setActiveChip(value)}
                        isActive={activeChip === value}
                    />
                ))}
            </FlexBox>
            <>
                <div className="hidden md:flex flex-col gap-6">
                    {rows.map((row, index) => (
                        <FlexBox key={index} className="justify-center gap-6">
                            {row.map((session, key) => (
                                <CardChip key={key} title={session.title} description={session.date} />
                            ))}
                        </FlexBox>
                    ))}
                </div>

                <div className="grid grid-cols-2 sm:gap-4 gap-3 md:hidden">
                    {items.map((session, idx) => (
                        <CardChip key={idx} title={session.title} description={session.date} />
                    ))}
                </div>
            </>
        </FlexBox>
    );
};

export default GroupChip;
