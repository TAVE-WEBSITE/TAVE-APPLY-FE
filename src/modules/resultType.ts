type Status = 'DRAFT' | 'SUBMITTED' | 'DOCUMENT_PASSED' | 'REJECTED' | 'FINAL_ACCEPTED';

type OutcomeStatus = 'NO_STATUS' | 'DOCUMENT_PASSED' | 'REJECTED' | 'FINAL_ACCEPTED';

interface ApplicantData {
    generation: number;
    fieldType: string;
    applicationStatus: Status;
}

interface FinalData {
    id: number;
    totalFee: number;
    clubFee: number;
    mtFee: number;
    feeDeadline: string;
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    surveyLink: string;
    surveyDeadline: string;
    otLink: string;
    otPassword: string;
    otDeadline: string;
}

interface InterviewData {
    interviewDate: string;
    interviewTime: string;
    dayName: string;
    generalAddress: string;
    detailAddress: string;
    openChatLink: string;
    code: string;
}

export type { Status, ApplicantData, OutcomeStatus, InterviewData, FinalData };
