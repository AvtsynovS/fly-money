import { CitizenshipCode } from './types/types';

export const REGEXP = {
  /**
   * Международный формат телефона (E.164).
   * Разрешает опциональный плюс на старте и от 10 до 15 цифр без пробелов.
   */
  PHONE: /^\+\d \(\d{3}\) \d{3}-\d{2}-\d{2}$/,
  ONLY_DIGITS: /^\d+$/,
  ONLY_LETTERS: /^[a-zA-Zа-яА-ЯёЁ\s-]+$/,
  DATE_DD_MM_YYYY: /^\d{2}\.\d{2}\.\d{4}$/,
  CLEAN_PHONE: /\D/g,
  REPLACE_SEVEN_DIGIT: /^7/,
};

export const PASSPORT_REGEXP: Record<CitizenshipCode, RegExp> = {
  ru: /^\d{2} \d{2} \d{6}$/,
  by: /^[A-Z]{2} \d{7}$/,
  kz: /^[A-Z]\d{8}$/,
  uz: /^[A-Z]{2} \d{7}$/,
};
