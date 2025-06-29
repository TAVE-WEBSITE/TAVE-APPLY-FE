import axios from 'axios';
import { axiosClient } from '@/services/axiosClient';
import { ApplicantData, FinalData, InterviewData } from '@/modules/resultType';

const useResult = () => {
    const applyApplicantHistory = async (memberId: number): Promise<ApplicantData[] | null> => {
        try {
            const res = await axiosClient.get(`/v1/member/applicant/history/${memberId}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const applyInterview = async (generation: string): Promise<InterviewData | null> => {
        try {
            const res = await axiosClient.get(`/v1/member/interview-final/${generation}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const applyFinal = async (): Promise<FinalData | null> => {
        try {
            const res = await axiosClient.get(`/v1/member/final-pass`);
            return res.data.result;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const applyCoordinates = async (address: string) => {
        try {
            const res = await axios.get('/api/converter', {
                params: { query: address },
            });
            return res.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    return {
        applyApplicantHistory,
        applyInterview,
        applyFinal,
        applyCoordinates,
    };
};

export default useResult;
