'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { DateField, TextField, Typography } from '@/components/shared';

import { getPassportResolver, PassportStepInput } from '../schemas/auth.schema';
import { useAuthRegistrationStore } from '../store/auth.store';
import { FooterForm } from './FooterForm';
import { filterOnlyLetters } from '@/lib/utils';
import { REGEXP } from '@/lib/regex';

const PASSPORT_MASKS: Record<string, string> = {
  ru: '00 00 000000',
  by: 'aa 0000000',
  kz: 'a00000000',
  uz: 'aa 0000000',
};

const PASSPORT_PLACEHOLDERS: Record<string, string> = {
  ru: '45 10 123456',
  by: 'AB 1234567',
  kz: 'N12345678',
  uz: 'AA 1234567',
};

export const PassportStep = () => {
  const { updateData, nextStep, prevStep, isLoading, citizenship } =
    useAuthRegistrationStore();

  const currentMask = PASSPORT_MASKS[citizenship];
  const currentPlaceholder = PASSPORT_PLACEHOLDERS[citizenship];

  const methods = useForm<PassportStepInput>({
    resolver: zodResolver(getPassportResolver(citizenship)),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: PassportStepInput) => {
    try {
      updateData(values);
      nextStep();
    } catch (err) {
      // TODO добавить уведомление об ошибке
      console.error('Ошибка на четвертом шаге:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
        <Typography variant="h5" as="h5">
          Паспортные данные
        </Typography>
        <Typography
          variant="description"
          as="p"
          className="text-muted-foreground"
        >
          Заполните данные документа, удостоверяющего личность
        </Typography>
        <div className="grid grid-cols-2 gap-x-4">
          <TextField
            name="lastName"
            label="Фамилия"
            type="text"
            placeholder="Иванов"
            mask={REGEXP.ONLY_LETTERS}
            prepareChar={filterOnlyLetters}
            autoFocus
            disabled={isLoading}
            required
          />

          <TextField
            name="firstName"
            label="Имя"
            type="text"
            placeholder="Иван"
            mask={REGEXP.ONLY_LETTERS}
            prepareChar={filterOnlyLetters}
            disabled={isLoading}
            required
          />

          <TextField
            name="passportNumber"
            label="Серия и номер"
            type="text"
            mask={currentMask}
            placeholder={currentPlaceholder}
            prepareChar={(str: string) => str.toUpperCase()}
            disabled={isLoading}
            required
          />

          <DateField
            name="expiryDate"
            label="Срок действия"
            type="text"
            placeholder="ДД.ММ.ГГГГ"
            disabled={isLoading}
            required
          />
        </div>
        <FooterForm
          cancelText="Назад"
          confirmText="Продолжить"
          isLoading={isLoading}
          onCancel={prevStep}
        />
      </form>
    </FormProvider>
  );
};
