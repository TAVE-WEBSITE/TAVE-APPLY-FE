import axios from 'axios';
import { axiosClient } from '@/services/axiosClient';

const useResult = () => {
    const applyApplicantHistory = async (memberId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/applicant/history/${memberId}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const applyInterview = async (generation: string) => {
        try {
            const res = await axiosClient.get(`/v1/member/interview-final/${generation}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const applyFinal = async () => {
        try {
            const res = await axiosClient.get(`/v1/member/final-pass`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const applyCoordinates = async (address: string) => {
        try {
            const res = await axios.get('/api/converter', {
                params: { query: address },
            });
            return res.data.addresses;
        } catch (error) {
            console.error(error);
        }
    };

    const applyIsDocument = async () => {
        try {
            const res = await axiosClient.get('/v1/member/apply-recruit/expiration');
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    return {
        applyApplicantHistory,
        applyInterview,
        applyFinal,
        applyCoordinates,
        applyIsDocument,
    };
};

export default useResult;
