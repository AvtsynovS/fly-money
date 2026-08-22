import { REGEXP } from '@/lib/regex';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizePhoneToDigits = (phone: string) => {
  if (!phone) return '';

  const onlyDigits = phone.replace(REGEXP.CLEAN_PHONE, '');

  return onlyDigits.replace(REGEXP.REPLACE_SEVEN_DIGIT, '8');
};

export const filterOnlyLetters = (str: string) =>
  REGEXP.ONLY_LETTERS.test(str) ? str : '';
