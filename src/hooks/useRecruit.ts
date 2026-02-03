import { axiosClient } from '@/services/axiosClient';
import { PersonalData, ResumeData } from '@/modules/recruitType';
import { useMemberStore } from '@/store/memberStore';
import axios from 'axios';

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

    const applySchedule = async () => {
        try {
            const res = await axiosClient.get(`/v1/member/config/interview-time`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const applyApplicationQuestion = async (resumeId: number, page: number) => {
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

    const postSocialLinks = async (resumeId: number, blogUrl: string, githubUrl: string) => {
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

    const postPortfolio = async (resumeId: number, portfolio: File | string) => {
        try {
            let res;
            if (portfolio === '') {
                res = await axiosClient.post(`/v1/member/resume/${resumeId}/portfolio`);
            } else {
                const file = new FormData();
                file.append('file', portfolio);
                res = await axiosClient.post(`/v1/member/resume/${resumeId}/portfolio`, file, {
                    headers: {
                        'Content-Type': undefined,
                    },
                });
            }
            return res.status;
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error)) {
                return error.response?.data;
            }
        }
    };

    const applyUrl = async (resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resume/${resumeId}/social-links/detail`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    return {
        applyPersonal,
        makeApplication,
        postResume,
        applyApplicationQuestion,
        applyTempApplication,
        postTempApplication,
        applySchedule,
        applyCompleteEmail,
        postSocialLinks,
        postPortfolio,
        applyUrl,
    };
};

export default useRecruit;
