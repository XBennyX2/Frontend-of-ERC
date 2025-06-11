import { LoginCredentials, AuthTokens } from '@/types';
import { post } from './apiClient';

/**
 * Log in a user
 * @param credentials User credentials
 * @returns Auth tokens
 */
export const login = async (credentials: LoginCredentials): Promise<AuthTokens> => {
  return post<AuthTokens>('/users/login/', credentials);
};


/**
 * Refresh auth token
 * @param refresh Refresh token
 * @returns New auth tokens
 */
export const refreshToken = async (refresh: string): Promise<AuthTokens> => {
  return post<AuthTokens>('/users/token/refresh/', { refresh });
};

/**
 * Log out a user
 * @param refresh Refresh token
 * @returns Success message
 */
export const logout = async (refresh: string): Promise<{ message: string }> => {
  return post<{ message: string }>('/users/logout/', { refresh });
};

/**
 * Verify auth token
 * @param token Auth token to verify
 * @returns Success status
 */
export const verifyToken = async (token: string): Promise<{ status: string }> => {
  return post<{ status: string }>('/users/token/verify/', { token });
};