'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  citizenshipStepSchema,
  CitizenshipStepInput,
} from '../schemas/auth.schema';
import { useAuthRegistrationStore } from '../store/auth.store';
import { SelectField } from '@/components/shared';
import { FooterForm } from './FooterForm';

const countries = [
  { label: 'Российская Федерация', value: 'ru' },
  { label: 'Республика Беларусь', value: 'by' },
  { label: 'Республика Казахстан', value: 'kz' },
  { label: 'Республика Узбекистан', value: 'uz' },
];

export const CitizenshipStep = () => {
  const { updateData, nextStep, prevStep, isLoading } =
    useAuthRegistrationStore();

  const methods = useForm<CitizenshipStepInput>({
    resolver: zodResolver(citizenshipStepSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = async (values: CitizenshipStepInput) => {
    try {
      updateData({ citizenship: values.citizenship });
      nextStep();
    } catch (err) {
      // TODO добавить уведомление об ошибке
      console.error('Ошибка на третьем шаге:', err);
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <SelectField
          name="citizenship"
          label="Гражданство"
          options={countries}
          placeholder="Выберите страну из списка"
        />
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
