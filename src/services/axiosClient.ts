import axios from 'axios';
import { useMemberStore } from '@/store/memberStore';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken && config.headers) {
        config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            error.response.data.message === '토큰 재발급이 필요합니다.' &&
            !originalRequest.retry
        ) {
            try {
                const { email } = useMemberStore.getState();
                const refreshResponse = await axios.post(
                    `${API_BASE_URL}/v1/auth/refresh`,
                    { email },
                    { withCredentials: true }
                );
                const newAccessToken = refreshResponse.data.result.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                const currentPath = window.location.pathname;
                useMemberStore.getState().reset();
                localStorage.removeItem('accessToken');
                if (currentPath !== '/auth/signin') {
                    window.location.replace('/auth/signin');
                }
                alert('로그인이 필요합니다.');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
