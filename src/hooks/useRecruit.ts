import { axiosClient } from '@/api/axiosClient';
import { useRecruitStore } from '@/store/recruitStore';
import { Personal } from '@/modules/recruitType';

export const useRecruit = () => {
    const { setSchool, setMajor, setMinorDouble, setApplyField } = useRecruitStore();

    const getPersonal = async (memberId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/info/${memberId}`);
            if (res.status === 200) {
                setSchool(res.data.result.school);
                setMajor(res.data.result.major);
                setMinorDouble(res.data.result.minor);
                setApplyField(res.data.result.field);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const modifyPersonal = async (memberId: number) => {
        try {
            const res = await axiosClient.patch(`/v1/member/info/update/${memberId}`);
            if (res.status === 200) {
                setSchool(res.data.result.school);
                setMajor(res.data.result.major);
                setMinorDouble(res.data.result.minor);
                setApplyField(res.data.result.field);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const postApplication = async (body: Personal, memberId: number) => {
        try {
            const res = await axiosClient.post(`/v1/member/info/${memberId}`, body);
            if (res.status === 200) {
                console.log('성공');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getApplication = async (resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resumes/${resumeId}/questions`);
            if (res.status === 200) {
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getTempApplication = async (resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resume/temp-answer/${resumeId}`);
            if (res.status === 200) {
            }
        } catch (error) {
            console.error(error);
        }
    };

    const postTempApplication = async (resumeId: number) => {
        try {
            const res = await axiosClient.post(`/v1/member/resume/temp-answer/${resumeId}`);
            if (res.status === 200) {
            }
        } catch (error) {
            console.error(error);
        }
    };

    const postResume = async (body: Personal, resumeId: number) => {
        try {
            const res = await axiosClient.post(`/v1/member/resumes/${resumeId}`, body);
            if (res.status === 200) {
                console.log(res.data.result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getEmail = async (body: Personal, resumeId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/resume/email/${resumeId}`);
            if (res.status === 200) {
                console.log(res.data.result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        getPersonal,
        postResume,
        modifyPersonal,
        postApplication,
        getApplication,
        getTempApplication,
        postTempApplication,
    };
};
