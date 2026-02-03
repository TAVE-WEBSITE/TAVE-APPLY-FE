import { Schedule, TimeSlot } from '@/modules/recruitType';

export function formatTimeSlot(times: TimeSlot[]): Schedule[] {
    const dateMap = new Map<string, Set<string>>();

    times.forEach(({ time }) => {
        const date = new Date(time);
        const dateKey = formatDateKey(date);
        const timeStr = toTimeString(date);

        if (!dateMap.has(dateKey)) {
            dateMap.set(dateKey, new Set());
        }
        dateMap.get(dateKey)!.add(timeStr);
    });

    const allTimeSlots = Array.from(new Set([...dateMap.values()].flatMap((set) => Array.from(set)))).sort(
        compareTimeStrings
    );

    return Array.from(dateMap.entries()).map(([dateKey, timeSet]) => ({
        date: dateKey,
        timeSlots: allTimeSlots.filter((time) => timeSet.has(time)).map((time) => ({ time })),
    }));
}

export function buildTimeSlot(selectedTimes: string[]): TimeSlot[] {
    return selectedTimes.map((datetimeStr) => {
        const [datePart, timePart] = datetimeStr.split('T');
        const [month, day] = datePart.trim().split(' ')[0].split('/').map(Number);
        const [hour, minute] = timePart.split(':').map(Number);

        const now = new Date();
        const year = now.getFullYear();

        const date = new Date(year, month - 1, day, hour, minute);

        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, '0');
        const dd = String(date.getDate()).padStart(2, '0');
        const hh = String(date.getHours()).padStart(2, '0');
        const mi = String(date.getMinutes()).padStart(2, '0');

        return { time: `${yyyy}-${mm}-${dd}T${hh}:${mi}` };
    });
}

export function formatSelectedTimes(timeSlots: TimeSlot[]): string[] {
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

function formatDateKey(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const day = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'][date.getDay()];
    return `${mm}/${dd} ${day}`;
}

function toTimeString(date: Date): string {
    return date.toTimeString().slice(0, 5);
}

function compareTimeStrings(a: string, b: string): number {
    const [ah, am] = a.split(':').map(Number);
    const [bh, bm] = b.split(':').map(Number);
    return ah !== bh ? ah - bh : am - bm;
}
