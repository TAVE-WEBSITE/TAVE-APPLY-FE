import { axiosClient } from '@/services/axiosClient';
import { PersonalData, ResumeData } from '@/modules/recruitType';
import { useMemberStore } from '@/store/memberStore';
import axios from 'axios';

const PDF_CONTENT_TYPE = 'application/pdf';
const PORTFOLIO_MAX_SIZE = 200 * 1024 * 1024;

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

    // PresignedUrl 발급 → S3 직접 업로드 → 완료 처리, 빈 값이면 포트폴리오 삭제
    const postPortfolio = async (
        resumeId: number,
        portfolio: File | string
    ): Promise<{ status: number; portfolioUrl: string | null } | { message: string }> => {
        try {
            if (portfolio === '') {
                const res = await axiosClient.delete(`/v1/member/resume/${resumeId}/portfolio`);
                return { status: res.status, portfolioUrl: null };
            }

            // 이미 업로드된 파일(URL)은 다시 올리지 않음
            if (typeof portfolio === 'string') {
                return { status: 200, portfolioUrl: portfolio };
            }

            const isPdf = portfolio.type === PDF_CONTENT_TYPE || portfolio.name.toLowerCase().endsWith('.pdf');
            if (!isPdf) {
                return { message: 'PDF 파일만 업로드할 수 있습니다.' };
            }
            if (portfolio.size > PORTFOLIO_MAX_SIZE) {
                return { message: '파일 크기는 최대 200MB까지 허용됩니다.' };
            }

            const issueRes = await axiosClient.post(`/v1/member/resume/${resumeId}/portfolio/presigned-url`, {
                contentType: PDF_CONTENT_TYPE,
                fileSize: portfolio.size,
            });
            const { presignedUrl, objectKey } = issueRes.data.result;

            // S3 서명이 깨지지 않도록 인증 헤더가 붙는 axiosClient 대신 기본 axios 사용
            await axios.put(presignedUrl, portfolio, {
                headers: { 'Content-Type': PDF_CONTENT_TYPE },
            });

            const completeRes = await axiosClient.post(`/v1/member/resume/${resumeId}/portfolio/complete`, {
                objectKey,
            });
            return { status: completeRes.status, portfolioUrl: completeRes.data.result.portfolioUrl };
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error) && typeof error.response?.data?.message === 'string') {
                return { message: error.response.data.message };
            }
            return { message: '포트폴리오 업로드에 실패했습니다.' };
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
