// formatTimeSlot.ts
import { Schedule } from '@/modules/recruitType';

/**
 * formatTimeSlot: API 응답 값을 UI에서 사용할 수 있도록 가공 (MM/DD (요일), HH:mm 형태로)
 */
export default function formatTimeSlot(times: { time: string }[]): Schedule[] {
    const dateMap = new Map<string, Set<string>>();

    for (const item of times) {
        const datetime = item.time;
        const date = new Date(datetime);
        const dateKey = formatDateKey(date);
        const timeStr = toTimeString(date);

        if (!dateMap.has(dateKey)) {
            dateMap.set(dateKey, new Set());
        }
        dateMap.get(dateKey)!.add(timeStr);
    }

    const allTimeSlots = new Set<string>();
    for (const timeSet of dateMap.values()) {
        for (const time of timeSet) {
            allTimeSlots.add(time);
        }
    }

    const sortedTimeSlots = [...allTimeSlots].sort(compareTimeStrings);

    const result: Schedule[] = [];
    for (const [dateKey, timeSet] of dateMap.entries()) {
        const timeSlots = sortedTimeSlots.filter((time) => timeSet.has(time)).map((time) => ({ time }));

        result.push({ date: dateKey, timeSlots });
    }

    return result;
}

function formatDateKey(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const day = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'][date.getDay()];
    return `${mm}/${dd} ${day}`;
}

function toTimeString(date: Date): string {
    return date.toTimeString().slice(0, 5); // HH:mm
}

function compareTimeStrings(a: string, b: string) {
    const [ah, am] = a.split(':').map(Number);
    const [bh, bm] = b.split(':').map(Number);
    return ah !== bh ? ah - bh : am - bm;
}

// utils/parseTimeSlot.ts
export function formatToSelectedTimes(timeSlots: { time: string }[]): string[] {
    return timeSlots.map(({ time }) => {
        const date = new Date(time);
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const weekday = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'][date.getDay()];
        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');
        return `${mm}/${dd} ${weekday}T${hh}:${mi}`;
    });
}
