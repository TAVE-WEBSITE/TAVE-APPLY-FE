import { axiosInstance } from '@/api/axiosInstance';
import { useRecruitStore } from '@/store/recruitStore';
import { Personal } from '@/modules/recruitType';

export const useRecruit = () => {
    const { setSchool, setMajor, setMinorDouble, setApplyField } = useRecruitStore();

    const getPersonal = async (memberId: number) => {
        try {
            const res = await axiosInstance.get(`/v1/member/info/temp-save/${memberId}`);
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

    const postPersonal = async (body: Personal, memberId: number) => {
        try {
            const res = await axiosInstance.post(`/v1/member/info/temp-save/${memberId}`, body);
            if (res.status === 200) {
                console.log('성공');
            }
        } catch (error) {
            console.error(error);
        }
    };

      const postResume = async (body: Personal, memberId: number) => {
        try {
            const res = await axiosInstance.post(`/v1/member/info/${memberId}`, body);
            if (res.status === 200) {
                console.log(res.data.result);
            }
        } catch (error) {
            console.error(error);
        }
    };

     const getResume = async (resumeId: number) => {
        try {
            const res = await axiosInstance.get(`/v1/member/resumes/${resumeId}/questions`);
            if (res.status === 200) {
                console.log(res.data.result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getInterview = async (resumeId: number) => {
        try {
            const res = await axiosInstance.get(`/v1/member/info/${resumeId}/timeslot`);
            if (res.status === 200) {
                console.log(res.data.result);
            }
        } catch (error) {
            console.error(error);
        }
    };

    




    return {
        getPersonal,
        postPersonal,
        postResume,
        getResume,
        getInterview,
    };
};
