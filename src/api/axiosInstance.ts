import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance = axios.create({
    baseURL: API_BASE_URL + '/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    async (config) => {
        if (typeof window !== undefined) {
            const accessToken = localStorage.getItem('accessToken');
            config.headers.set('Authorization', `Bearer ${accessToken}`);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response?.status === 401 &&
            error.response.data.message === '토큰 재발급이 필요합니다.' &&
            !originalRequest.retry
        ) {
            try {
                const email = localStorage.getItem('email');
                const refreshResponse = await axiosInstance.post('/auth/refresh', { email: email });
                const newAccessToken = refreshResponse.data.result.accessToken;
                localStorage.setItem('accessToken', newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                alert('로그인이 필요합니다.');
                localStorage.removeItem('accessToken');
                localStorage.removeItem('email');
                window.location.replace('/auth/signin');
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
