import { Schedule } from "@/app/types/recruit";

export default function formatTimeSlot(times: string[]) {
  const dateMap = new Map<string, Set<string>>();

  for (const datetime of times) {
    const date = new Date(datetime.replace(" ", "T"));
    const dateKey = formatDateKey(date);
    const timeStr = toTimeString(date);

    if (!dateMap.has(dateKey)) {
      dateMap.set(dateKey, new Set());
    }
    dateMap.get(dateKey)!.add(timeStr);
  }

  // 전체 시간 슬롯 집합 수집
  const allTimeSlots = new Set<string>();
  for (const timeSet of dateMap.values()) {
    for (const time of timeSet) {
      allTimeSlots.add(time);
    }
  }

  // 정렬된 시간 슬롯 배열
  const sortedTimeSlots = [...allTimeSlots].sort(compareTimeStrings);

  // 날짜별 결과 구성
  const result: Schedule[] = [];
  for (const [dateKey, timeSet] of dateMap.entries()) {
    const timeSlots = sortedTimeSlots.map((time) => ({
      time,
    }));

    result.push({ date: dateKey, timeSlots });
  }

  return result;
}

// 날짜: "MM/DD TUE"
function formatDateKey(date: Date): string {
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const day = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"][
    date.getDay()
  ];
  return `${mm}/${dd} ${day}`;
}

// 시간: "HH:mm"
function toTimeString(date: Date): string {
  return date.toTimeString().slice(0, 5); // "HH:mm"
}

// 시간 문자열 정렬용: "13:30" -> 숫자로 비교
function compareTimeStrings(a: string, b: string) {
  const [ah, am] = a.split(":").map(Number);
  const [bh, bm] = b.split(":").map(Number);
  return ah !== bh ? ah - bh : am - bm;
}
