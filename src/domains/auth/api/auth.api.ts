import { apiClient } from '@lib/api-client';

import { RegistrationInput } from '../schemas/auth.schema';

export interface SendSmsResponse {
  success: boolean;
  message: string;
}

export interface RegistrationResponse {
  success: boolean;
  userId: string;
  token: string;
  message: string;
}

export const authApi = {
  sendSmsCode: async (phone: string): Promise<SendSmsResponse> => {
    const response = await apiClient.post<SendSmsResponse>('/auth/send-sms', {
      phone,
    });

    return response.data;
  },

  register: async (dto: RegistrationInput): Promise<RegistrationResponse> => {
    const response = await apiClient.post<RegistrationResponse>(
      '/auth/register',
      dto,
    );

    return response.data;
  },
};
