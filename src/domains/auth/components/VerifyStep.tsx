'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { termsStepSchema, TermsStepInput } from '../schemas/auth.schema';
import { useAuthRegistrationStore } from '../store/auth.store';
import { CheckboxField, Typography } from '@/components/shared';
import { FooterForm } from './FooterForm';

export const VerifyStep = () => {
  const { updateData, submitFinalRegistration, prevStep, isLoading, error } =
    useAuthRegistrationStore();

  const methods = useForm<TermsStepInput>({
    resolver: zodResolver(termsStepSchema),
    defaultValues: {
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: TermsStepInput) => {
    try {
      updateData(values);

      await submitFinalRegistration();
      // TODO добавить редирект на гл. страницу
    } catch (err) {
      console.error('Ошибка при финальной регистрации:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md space-y-4"
      >
        <Typography variant="h5" as="h5">
          Согласие на обработку данных
        </Typography>
        <Typography
          variant="description"
          as="p"
          className="text-muted-foreground"
        >
          Последний шаг — подтвердите согласия, и аккаунт будет создан
        </Typography>
        <CheckboxField
          name="agreeToPrivacy"
          description={
            <Typography variant="description" as="p">
              Даю согласие на обработку персональных данных в соответствии с
              152-ФЗ
            </Typography>
          }
        />
        <CheckboxField
          name="agreeToTerms"
          description={
            <Typography variant="description" as="p">
              Согласен с Пользовательским соглашением и Политикой
              конфиденциальности
            </Typography>
          }
        />
        <FooterForm
          cancelText="Назад"
          confirmText={isLoading ? 'Регистрация...' : 'Регистрация'}
          isLoading={isLoading}
          onCancel={prevStep}
        />
      </form>
    </FormProvider>
  );
};
