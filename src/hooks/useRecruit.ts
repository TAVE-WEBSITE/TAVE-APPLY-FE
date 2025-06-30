import { axiosClient } from '@/services/axiosClient';
import { useRecruitStore } from '@/store/recruitStore';
import { Personal, ResumeAnswerRequest } from '@/modules/recruitType';
import { useMemberStore } from '@/store/memberStore';
import { formattedToRecruitField } from '@/utils/formatField';

export const useRecruit = () => {
    const { setResumeId } = useMemberStore();
    const { setSchool, setMajor, setMinorDouble, setApplyField, setSex, setBirthday, setPhoneNumber } =
        useRecruitStore();

    const getPersonal = async (memberId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/info/${memberId}`);
            setSex(res.data.result.sex);
            setBirthday(res.data.result.birthday);
            setPhoneNumber(res.data.result.phoneNumber);
            setSchool(res.data.result.school);
            setMajor(res.data.result.major);
            setMinorDouble(res.data.result.minor);
            setApplyField(formattedToRecruitField(res.data.result.field));
            return res.status;
        } catch (error) {
            console.error(error);
        }
    };

    const postApplication = async (body: Personal, memberId: number) => {
        try {
            const res = await axiosClient.post(`/v1/member/info/${memberId}`, body);
            setResumeId(res.data.result.resumeId);
            return res.status;
        } catch (error) {
            console.error(error);
            return error;
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
            if (res.status === 200) {
            }
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
            if (res.status === 200) {
                console.log(res.data.result);
            }
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
        getPersonal,
        postResume,
        postApplication,
        getApplicationQuestion,
        getTempApplication,
        postTempApplication,
        getTime,
        getEmail,
    };
};
