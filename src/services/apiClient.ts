import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { refreshToken } from './authService';

// Define base API URL using environment variable
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Create Axios instance with default config
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const tokensString = localStorage.getItem('auth_tokens');
    if (tokensString) {
      const tokens = JSON.parse(tokensString);
      // Add token to request headers
      config.headers.Authorization = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // If error is 401 and not already retrying, try to refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const tokensString = localStorage.getItem('auth_tokens');
        if (!tokensString) {
          // No tokens available, redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        }
        
        const tokens = JSON.parse(tokensString);
        const newTokens = await refreshToken(tokens.refresh);
        
        // Save new tokens to localStorage
        localStorage.setItem('auth_tokens', JSON.stringify(newTokens));
        
        // Update request header with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.access}`;
        } else {
          originalRequest.headers = {
            Authorization: `Bearer ${newTokens.access}`,
          };
        }
        
        // Retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh token failed, redirect to login
        localStorage.removeItem('auth_tokens');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// API request handlers
export const get = <T>(url: string, params?: object): Promise<T> => {
  return apiClient.get<T, AxiosResponse<T>>(url, { params }).then((res) => res.data);
};

export const post = <T>(url: string, data?: object): Promise<T> => {
  return apiClient.post<T, AxiosResponse<T>>(url, data).then((res) => res.data);
};

export const put = <T>(url: string, data?: object): Promise<T> => {
  return apiClient.put<T, AxiosResponse<T>>(url, data).then((res) => res.data);
};

export const patch = <T>(url: string, data?: object): Promise<T> => {
  return apiClient.patch<T, AxiosResponse<T>>(url, data).then((res) => res.data);
};

export const del = <T>(url: string): Promise<T> => {
  return apiClient.delete<T, AxiosResponse<T>>(url).then((res) => res.data);
};

export const upload = <T>(url: string, file: File, onProgress?: (percentage: number) => void): Promise<T> => {
  const formData = new FormData();
  formData.append('file', file);
  
  return apiClient
    .post<T, AxiosResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        if (onProgress && progressEvent.total) {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentage);
        }
      },
    })
    .then((res) => res.data);
};

export default apiClient;