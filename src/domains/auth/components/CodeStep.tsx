'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { codeStepSchema, CodeStepInput } from '../schemas/auth.schema';
import { useAuthRegistrationStore } from '../store/auth.store';
import { TextField } from '@/components/shared';
import { FooterForm } from './FooterForm';

export const CodeStep = () => {
  const {
    updateData,
    nextStep,
    prevStep,
    isLoading,
    // TODO добавить уведомление об ошибке
    error,
    resendCountdown,
    resendSmsCode,
  } = useAuthRegistrationStore();

  const methods = useForm<CodeStepInput>({
    resolver: zodResolver(codeStepSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: CodeStepInput) => {
    try {
      updateData({ code: values.code });
      nextStep();
    } catch (err) {
      // TODO добавить уведомление об ошибке
      console.error('Ошибка на втором шаге:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <TextField
          name="code"
          label="Код подтверждения из СМС"
          type="text"
          maxLength={6}
          placeholder="000000"
          mask="000000"
          autoFocus
          disabled={isLoading}
        />
        <div className="ml-3 text-sm text-muted-foreground">
          {resendCountdown > 0 ? (
            <p>
              Получить новый код можно через{' '}
              <span className="font-medium text-foreground">
                0:
                {resendCountdown < 10 ? `0${resendCountdown}` : resendCountdown}
              </span>
            </p>
          ) : (
            <button
              type="button"
              disabled={isLoading}
              onClick={resendSmsCode}
              className="font-medium text-primary hover:underline disabled:opacity-50"
            >
              Отправить код повторно
            </button>
          )}
        </div>
        <FooterForm
          cancelText="Назад"
          confirmText="Подтвердить"
          isLoading={isLoading}
          onCancel={prevStep}
        />
      </form>
    </FormProvider>
  );
};
