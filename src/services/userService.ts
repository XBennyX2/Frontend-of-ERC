import { User } from '@/types';
import { get, patch, upload } from './apiClient';

/**
 * Get current user's profile
 * @returns User information
 */
export const getUserProfile = async (): Promise<User> => {
  return get<User>('/users/profile/');
};

/**
 * Update user profile
 * @param data Profile data to update
 * @returns Updated user profile
 */
export const updateUserProfile = async (data: Partial<User>): Promise<User> => {
  return patch<User>('/users/profile/', data);
};

/**
 * Change user password
 * @param oldPassword Current password
 * @param newPassword New password
 * @returns Success message
 */
export const changePassword = async (
  oldPassword: string,
  newPassword: string
): Promise<{ message: string }> => {
  return patch<{ message: string }>('/users/change-password/', {
    old_password: oldPassword,
    new_password: newPassword,
  });
};

/**
 * Upload user avatar
 * @param file Avatar image file
 * @param onProgress Progress callback
 * @returns Updated user with avatar URL
 */
export const uploadAvatar = async (
  file: File,
  onProgress?: (percentage: number) => void
): Promise<User> => {
  return upload<User>('/users/avatar/', file, onProgress);
};