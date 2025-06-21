interface FormattedSession {
    title: string;
    date: string;
}

interface Session {
    title: string;
    eventDay: string;
    period: SessionChip;
    sessionId: number;
    description: string;
    imgUrl: string;
}

interface Setting {
    accessEndDate: string;
    accessStartDate: string;
    generation: string;
    documentRecruitStartDate: string;
    documentRecruitEndDate: string;
    documentAnnouncementDate: string;
    interviewStartDate: string;
    interviewEndDate: string;
    lastAnnouncementDate: string;
}

type SessionChip = 'START' | 'PART1' | 'PART2';

type SessionGrouped = Record<SessionChip, FormattedSession[]>;

export type { SessionChip, Session, SessionGrouped, Setting };
