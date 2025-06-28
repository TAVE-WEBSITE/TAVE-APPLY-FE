type Status = 'DRAFT' | 'SUBMITTED' | 'DOCUMENT_PASSED' | 'REJECTED' | 'FINAL_ACCEPTED';

interface ApplicantData {
    generation: number;
    fieldType: string;
    applicationStatus: Status;
}

export type { Status, ApplicantData };
