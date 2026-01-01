import useAuthStore from "@/stores/auth.store";
import axios, { AxiosError } from "axios";

const baseApiUrl = `${import.meta.env.VITE_API_URL}/api/v1`;

const $axios = axios.create({
  baseURL: baseApiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const response = await $axios.post("/auth/refresh-token");
    return response.data.data.accessToken;
  } catch (error) {
    localStorage.clear();
    window.location.href = "/login";
    throw error;
  }
};

// response interceptor for unauthorized requests
$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const accessToken = useAuthStore.getState().accessToken;
    // this url will not be checked for refresh token
    const byPassUrls = [
      "/auth/login",
      "/auth/refresh-token",
      "/auth/register",
      "/auth/resend-otp",
      "/auth/logout",
      "/auth/logout-all",
      "/passwords/forgot",
      "/passwords/verify-otp",
      "/passwords/change",
      "/passwords/reset",
    ];
    if (!error.config || !error.config.url) {
      throw error;
    }
    if (byPassUrls.includes(error.config.url) || !accessToken) {
      throw error;
    }
    if (error.response && error.response.status == 401) {
      const newAccessToken: string = await refreshAccessToken();
      const originalRequest = error.config;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return $axios(originalRequest);
    }
    throw error;
  }
);

// intercepting each request with authorization header
$axios.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default $axios;
