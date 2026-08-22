import { PASSPORT_ERROR_MESSAGES } from '@/lib/errors';
import { PASSPORT_REGEXP, REGEXP } from '@/lib/regex';
import { z } from 'zod';
import { CitizenshipCode } from '../../../lib/types/types';

export const CITIZENSHIP_CODES = ['ru', 'by', 'kz', 'uz'] as const;

export const phoneStepSchema = z.object({
  phone: z
    .string('Введите номер')
    .min(10, 'Номер слишком короткий')
    .max(18, 'Некорректный формат телефона')
    .regex(REGEXP.PHONE, 'Введите корректный номер телефона'),
});

export const codeStepSchema = z.object({
  code: z
    .string('Введите код')
    .length(6, 'Код должен состоять из 6 цифр')
    .regex(REGEXP.ONLY_DIGITS, 'Код должен содержать только цифры'),
});

export const citizenshipStepSchema = z.object({
  citizenship: z.enum(CITIZENSHIP_CODES, 'Пожалуйста, выберите страну'),
});

export const passportStepSchema = z.object({
  lastName: z
    .string('Введите фамилию')
    .min(1, 'Заполните поле Фамилия')
    .regex(REGEXP.ONLY_LETTERS, 'Фамилия может содержать только буквы'),
  firstName: z
    .string('Введите имя')
    .min(1, 'Заполните поле Имя')
    .regex(REGEXP.ONLY_LETTERS, 'Имя может содержать только буквы'),
  passportNumber: z
    .string('Укажите серию и номер')
    .min(1, 'Укажите серию и номер'),
  expiryDate: z
    .string('Укажите срок действия')
    .min(10, 'Укажите срок действия')
    .regex(REGEXP.DATE_DD_MM_YYYY, 'Некорректный формат'),
});

export const addressStepSchema = z.object({
  addressCountry: z.string('Введите страну').min(1, 'Заполните поле Страна'),
  addressCity: z.string('Введите город').min(1, 'Заполните поле Город'),
  addressStreet: z.string('Введите улицу').min(1, 'Заполните поле Улица'),
  addressHouse: z
    .string('Введите номер квартиры/дома')
    .min(1, 'Заполните поле Дом, квартира'),
});

export const termsStepSchema = z.object({
  agreeToTerms: z.boolean().refine((val) => val === true, 'Обязательное поле'),
  agreeToPrivacy: z
    .boolean()
    .refine((val) => val === true, 'Обязательное поле'),
});

export const getPassportResolver = (citizenship: CitizenshipCode) => {
  return passportStepSchema.superRefine((data, ctx) => {
    const currentRegexp = PASSPORT_REGEXP[citizenship] || PASSPORT_REGEXP.ru;
    const currentMessage =
      PASSPORT_ERROR_MESSAGES[citizenship] || PASSPORT_ERROR_MESSAGES.ru;

    if (!currentRegexp.test(data.passportNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: currentMessage,
        path: ['passportNumber'],
      });
    }
  });
};

const registrationSchema = phoneStepSchema
  .and(codeStepSchema)
  .and(citizenshipStepSchema)
  .and(passportStepSchema)
  .and(addressStepSchema)
  .and(termsStepSchema);

export type PhoneStepInput = z.infer<typeof phoneStepSchema>;
export type CodeStepInput = z.infer<typeof codeStepSchema>;
export type CitizenshipStepInput = z.infer<typeof citizenshipStepSchema>;
export type PassportStepInput = z.infer<typeof passportStepSchema>;
export type AddressStepInput = z.infer<typeof addressStepSchema>;
export type TermsStepInput = z.infer<typeof termsStepSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;
