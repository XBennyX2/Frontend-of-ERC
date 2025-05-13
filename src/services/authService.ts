import { LoginCredentials, RegisterData, AuthTokens } from '@/types';
import { post } from './apiClient';

/**
 * Log in a user
 * @param credentials User credentials
 * @returns Auth tokens
 */
export const login = async (credentials: LoginCredentials): Promise<AuthTokens> => {
  return post<AuthTokens>('/auth/login/', credentials);
};

/**
 * Register a new user
 * @param data User registration data
 * @returns Success message
 */
export const register = async (data: RegisterData): Promise<{ message: string }> => {
  return post<{ message: string }>('/auth/register/', data);
};

/**
 * Request password reset
 * @param email User email address
 * @returns Success message
 */
export const requestPasswordReset = async (email: string): Promise<{ message: string }> => {
  return post<{ message: string }>('/auth/password-reset/', { email });
};

/**
 * Reset password with token
 * @param token Reset token
 * @param password New password
 * @returns Success message
 */
export const resetPassword = async (token: string, password: string): Promise<{ message: string }> => {
  return post<{ message: string }>('/auth/password-reset/confirm/', { token, password });
};

/**
 * Refresh auth token
 * @param refresh Refresh token
 * @returns New auth tokens
 */
export const refreshToken = async (refresh: string): Promise<AuthTokens> => {
  return post<AuthTokens>('/auth/token/refresh/', { refresh });
};

/**
 * Log out a user
 * @param refresh Refresh token
 * @returns Success message
 */
export const logout = async (refresh: string): Promise<{ message: string }> => {
  return post<{ message: string }>('/auth/logout/', { refresh });
};

/**
 * Verify auth token
 * @param token Auth token to verify
 * @returns Success status
 */
export const verifyToken = async (token: string): Promise<{ status: string }> => {
  return post<{ status: string }>('/auth/token/verify/', { token });
};