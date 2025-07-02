import { axiosClient } from '@/services/axiosClient';
import { FormattedField, Personal, ResumeAnswerRequest } from '@/modules/recruitType';
import { useMemberStore } from '@/store/memberStore';

export const useRecruit = () => {
    const { setResumeId } = useMemberStore();

    const applyPersonal = async (memberId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/info/${memberId}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const makeApplication = async (body: Personal, memberId: number) => {
        try {
            const res = await axiosClient.post(`/v1/member/info/${memberId}`, body);
            setResumeId(res.data.result.resumeId);
            return res.status;
        } catch (error) {
            console.error(error);
            return error;
        }
    };

    const applyProgrammingLevel = async (field: FormattedField | string) => {
        try {
            const res = await axiosClient.get(`/v1/manager/lan/${field}`);
            console.log(res.data);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const getApplicationQuestion = async (resumeId: number, page: number = 1) => {
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

    const getTempApplication = async (resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resume/temp-answer/${resumeId}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const postTempApplication = async (resumeId: number, page: number = 1, body: ResumeAnswerRequest) => {
        try {
            const res = await axiosClient.post(`/v1/member/resume/temp-answer/${resumeId}`, body, {
                params: {
                    page,
                },
            });
            return res.status;
        } catch (error) {
            console.error(error);
        }
    };

    const postResume = async (resumeId: number, body: ResumeAnswerRequest, page: number = 1) => {
        try {
            const res = await axiosClient.post(`/v1/member/resumes/${resumeId}`, body, {
                params: {
                    page,
                },
            });
            return res.status;
        } catch (error) {
            console.error(error);
        }
    };

    const getEmail = async (resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resume/email/${resumeId}`);
            if (res.status === 200) {
                return res.data.result;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const postSocialLinks = async (resumeId: number, blogUrl: string, githubUrl: string) => {
        try {
            const res = await axiosClient.post(`/v1/member/resume/${resumeId}/social-links`, {
                blogUrl,
                githubUrl,
            });

            if (res.status === 200) {
                return res.data.result;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const postURL = async (resumeId: number, file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file); // 서버가 기대하는 key 이름에 맞게 설정

            // 만약 다른 필드가 필요하면 추가 가능
            // formData.append('otherField', 'value');

            const res = await axiosClient.post(`/v1/member/resume/${resumeId}/portfolio`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 반드시 설정
                },
            });

            if (res.status === 200) {
                return res.data.result;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getTime = async (resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/info/${resumeId}/timeslot`);
            if (res.status === 200) {
                return res.data.result;
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        applyPersonal,
        makeApplication,
        postResume,
        getApplicationQuestion,
        getTempApplication,
        postTempApplication,
        getTime,
        getEmail,
        applyProgrammingLevel,
        postSocialLinks,
        postURL,
    };
};
