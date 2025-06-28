import { axiosClient } from '@/api/axiosClient';

const useResult = () => {
    const getApplicantHistory = async (memberId: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/applicant/history/${memberId}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const getInterview = async (generation: number) => {
        try {
            const res = await axiosClient.get(`/v1/member/interview-final/${generation}`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    const getFinal = async () => {
        try {
            const res = await axiosClient.get(`/v1/member/final-pass`);
            return res.data.result;
        } catch (error) {
            console.error(error);
        }
    };

    /*

    const getMapLet = async (address: string) => {
        try {
            const res = await axios.get('/api/converter', {
                params: { query: address },
            });
            return res.data;
        } catch (error) {
            console.error('[getMapLet 에러]', error);
        }
    };
*/
    return {
        getApplicantHistory,
        getInterview,
        getFinal,
    };
};

export default useResult;
