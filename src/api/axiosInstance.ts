import axios, { AxiosError } from "axios";
import { getCookie } from "cookies-next";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.request.use(
  (response) => response,
  async (error) => {
    const axiosError: AxiosError = error;
    const originalRequest = error.config;

    if (
      axiosError.response?.status === 401 &&
      !originalRequest.retry &&
      axiosError.message === "토큰 재발급이 필요합니다."
    ) {
      try {
        const refreshToken = getCookie("refreshToken");
        console.log(refreshToken);
        const email = localStorage.getItem("email");
        const res = await axios.post(`${API_BASE_URL}/v1/auth/refresh`, {
          email,
          refreshToken,
        });
        const newAccessToken = res.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
