type Status = "작성 중" | "지원 완료" | "서류 합격" | "불합격" | "최종 합격";

interface ApplicantData {
  id: number;
  part: string;
  status: Status;
}

export type { Status, ApplicantData };
