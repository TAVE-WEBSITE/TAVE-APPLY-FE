import { axiosClient } from '@/services/axiosClient';
import { PersonalData, FormattedField, ResumeData } from '@/modules/recruitType';
import { useMemberStore } from '@/store/memberStore';

const useRecruit = () => {
    const { setResumeId } = useMemberStore();

    const applyPersonal = async (memberId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/info/${memberId}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const makeApplication = async (body: PersonalData, memberId: number) => {
        try {
            const res = await axiosClient.post(`/v1/member/info/${memberId}`, body);
            setResumeId(res.data.result.resumeId);
            return res.status;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const applyProgrammingLevel = async (field: FormattedField) => {
        try {
            const res = await axiosClient.get(`/v1/member/lan/field/${field}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const applySchedule = async () => {
        try {
            const res = await axiosClient.get(`/v1/member/config/interview-time`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const applyApplicationData = async (resumeId: number, page: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resumes/${resumeId}/questions`, {
                params: {
                    page,
                },
            });
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const applyTempApplication = async (resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resume/temp-answer/${resumeId}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const postTempApplication = async (resumeId: number, page: number, body: ResumeData) => {
        try {
            const res = await axiosClient.post(`/v1/member/resume/temp-answer/${resumeId}`, body, {
                params: {
                    page,
                },
            });
            return res.status;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const postResume = async (resumeId: number, body: ResumeData, page: number) => {
        try {
            const res = await axiosClient.post(`/v1/member/resumes/${resumeId}`, body, {
                params: {
                    page,
                },
            });
            return res.status;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const applyCompleteEmail = async (resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resume/email/${resumeId}`);
            return res.status;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const applySocialLinks = async (resumeId: number, blogUrl: string, githubUrl: string) => {
        try {
            const res = await axiosClient.post(`/v1/member/resume/${resumeId}/social-links`, {
                blogUrl,
                githubUrl,
            });
            return res.status;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const applyPortfolio = async (resumeId: number, portfolio: File) => {
        try {
            const file = new FormData();
            file.append('file', portfolio);
            const res = await axiosClient.post(`/v1/member/resume/${resumeId}/portfolio`, file, {
                headers: {
                    'Content-Type': undefined,
                },
            });
            return res.status;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    return {
        applyPersonal,
        makeApplication,
        postResume,
        applyApplicationData,
        applyTempApplication,
        postTempApplication,
        applySchedule,
        applyCompleteEmail,
        applyProgrammingLevel,
        applySocialLinks,
        applyPortfolio,
    };
};

export default useRecruit;
