import { Setting, Session, SessionGrouped, FormattedSession } from '@/modules/homeType';

export function formatSession(sessions: Session[]): {
    grouped: SessionGrouped;
    first: FormattedSession;
    second: FormattedSession;
} {
    const grouped = sessions.reduce<SessionGrouped>(
        (acc, session) => {
            const periodKey = session.period;
            const date = formatDate(session.eventDay, 'only');
            acc[periodKey].push({ title: session.title, date });
            return acc;
        },
        {
            START: [],
            PART1: [],
            PART2: [],
        }
    );
    const [first, second] = sessions;

    return {
        grouped,
        first: { title: first.title, date: formatDate(first.eventDay, 'only') },
        second: { title: second.title, date: formatDate(second.eventDay, 'only') },
    };
}

export function formatSetting(setting: Setting) {
    const formattedSetting = [
        {
            iconName: 'file',
            title: '서류 접수',
            description: `${formatDate(setting.documentRecruitStartDate, 'only')} - ${formatDate(
                setting.documentRecruitEndDate,
                'only'
            )}`,
        },
        {
            iconName: 'calendar',
            title: '서류 발표',
            description: formatDate(setting.documentAnnouncementDate, 'time'),
        },
        {
            iconName: 'user',
            title: '면접 진행',
            description: `${formatDate(setting.interviewStartDate, 'only')} - ${formatDate(
                setting.interviewEndDate,
                'only'
            )}`,
            extra: '* 온/오프라인 별도 안내',
        },
        {
            iconName: 'award',
            title: '최종 발표',
            description: formatDate(setting.lastAnnouncementDate, 'time'),
        },
    ];
    const generation = setting.generation;
    const isDocument = isInDocumentPeriod(setting.documentRecruitStartDate, setting.documentRecruitEndDate);

    return {
        formattedSetting,
        generation,
        isDocument,
    };
}

function formatDate(dateStr: string, type: 'only' | 'time'): string {
    const date = new Date(dateStr);
    const mm = date.getMonth() + 1;
    const dd = date.getDate();
    const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
    const day = dayNames[date.getDay()];
    if (type === 'only') {
        return `${mm}월 ${dd}일 (${day})`;
    } else {
        const hours = date.getHours();
        const ampm = hours >= 12 ? '오후' : '오전';
        const hour12 = hours % 12 === 0 ? 12 : hours % 12;
        return `${mm}월 ${dd}일 (${day}) ${ampm} ${hour12}시`;
    }
}

function isInDocumentPeriod(startStr: string, endStr: string): boolean {
    const now = new Date();
    const start = new Date(startStr);
    const end = new Date(endStr);

    return now >= start && now <= end;
}
