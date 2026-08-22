'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { phoneStepSchema, PhoneStepInput } from '../schemas/auth.schema';
import { useAuthRegistrationStore } from '../store/auth.store';
import { TextField, Typography } from '@/components/shared';
import { FooterForm } from './FooterForm';
import { normalizePhoneToDigits } from '@/lib/utils';

export const PhoneStep = () => {
  const { submitPhoneAndSendSms, isLoading, error } =
    useAuthRegistrationStore();

  const methods = useForm<PhoneStepInput>({
    resolver: zodResolver(phoneStepSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: PhoneStepInput) => {
    const phone = normalizePhoneToDigits(values.phone);

    try {
      await submitPhoneAndSendSms(phone);
    } catch (err) {
      // TODO добавить уведомление об ошибке
      console.error('Ошибка на первом шаге:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Typography
          variant="description"
          as="p"
          className="text-muted-foreground"
        >
          Укажите номер телефона — на него придёт код для входа в личный кабинет
        </Typography>
        <TextField
          name="phone"
          label="Номер телефона"
          type="tel"
          placeholder="+7 (999) 999-99-99"
          mask="+0 (000) 000-00-00"
          lazy={true}
          prepareChar={(str: string, masked: any) =>
            !masked.value && str === '8' ? '7' : str
          }
          autoFocus
          disabled={isLoading}
        />
        <FooterForm
          className="-mt-2!"
          confirmText={isLoading ? 'Отправка кода...' : 'Продолжить'}
          isLoading={isLoading}
        />
      </form>
    </FormProvider>
  );
};
