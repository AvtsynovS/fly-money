import { CitizenshipCode } from './types/types';

export const PASSPORT_ERROR_MESSAGES: Record<CitizenshipCode, string> = {
  ru: 'Используйте формат: 12 34 567890',
  by: 'Используйте формат: AB 1234567',
  kz: 'Используйте формат: N12345678',
  uz: 'Используйте формат: AA 1234567',
};
