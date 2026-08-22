import { create } from 'zustand';

// import { authApi } from '../api/auth.api';
import { RegistrationInput } from '../schemas/auth.schema';
import { CitizenshipCode } from '../../../lib/types/types';

type RegistrationData = Partial<RegistrationInput> & {
  firstName?: string;
  lastName?: string;
  passportNumber?: string;
  expiryDate?: string;
  birthDate?: string;
  address?: string;
  addressCountry?: string;
  addressCity?: string;
  addressStreet?: string;
  addressHouse?: string;
  agreeToTerms?: boolean;
  agreeToPrivacy?: boolean;
  citizenship?: CitizenshipCode;
};

interface AuthRegistrationState {
  step: number;
  data: RegistrationData;
  isLoading: boolean;
  error: string | null;
  resendCountdown: number;
  citizenship: CitizenshipCode;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (fields: RegistrationData) => void;
  resetRegistration: () => void;
  submitPhoneAndSendSms: (phone: string) => Promise<void>;
  submitFinalRegistration: () => Promise<void>;
  startCountdown: () => void;
  resendSmsCode: () => Promise<void>;
}

let countdownInterval: NodeJS.Timeout | null = null;

export const useAuthRegistrationStore = create<AuthRegistrationState>(
  (set, get) => ({
    step: 1,
    data: {},
    isLoading: false,
    error: null,
    resendCountdown: 0,
    citizenship: 'ru',

    setStep: (step) => {
      set({ step });
    },

    nextStep: () => {
      set((state) => ({ step: state.step + 1 }));
    },

    prevStep: () => {
      set((state) => ({ step: Math.max(1, state.step - 1) }));
    },

    updateData: (fields) => {
      set((state) => {
        const newData = { ...state.data, ...fields };

        return {
          data: newData,
          citizenship: fields.citizenship || state.citizenship,
        };
      });
    },

    resetRegistration: () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }

      set({
        step: 1,
        data: {},
        error: null,
        isLoading: false,
        resendCountdown: 0,
      });
    },

    startCountdown: () => {
      if (countdownInterval) {
        clearInterval(countdownInterval);
      }

      set({ resendCountdown: 59 });

      countdownInterval = setInterval(() => {
        const currentSeconds = get().resendCountdown;

        if (currentSeconds <= 1) {
          if (countdownInterval) {
            clearInterval(countdownInterval);
          }

          set({ resendCountdown: 0 });
        } else {
          set({ resendCountdown: currentSeconds - 1 });
        }
      }, 1000);
    },

    submitPhoneAndSendSms: async (phone) => {
      set({ isLoading: true, error: null });

      try {
        // Имитация отправки смс
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // await authApi.sendSmsCode(phone);

        get().updateData({ phone });
        get().nextStep();
        get().startCountdown();
      } catch (err: any) {
        set({ error: 'Ошибка отправки СМС' });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    resendSmsCode: async () => {
      const phone = get().data.phone;

      if (!phone || get().resendCountdown > 0) return;

      set({ isLoading: true, error: null });

      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        get().startCountdown();
      } catch (err: any) {
        set({ error: 'Ошибка повторной отправки СМС' });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },

    submitFinalRegistration: async () => {
      set({ isLoading: true, error: null });

      try {
        // Имитация сабмита формы регистрации
        await new Promise((resolve) => setTimeout(resolve, 1500));

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', 'fake-debug-jwt-token');
        }
        // const result = await authApi.register(fullPayload);

        // if (typeof window !== 'undefined') {
        //   localStorage.setItem('token', result.token);
        // }

        if (countdownInterval) {
          clearInterval(countdownInterval);
        }

        get().nextStep();
      } catch (err: any) {
        set({ error: 'Ошибка регистрации' });
        throw err;
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);
