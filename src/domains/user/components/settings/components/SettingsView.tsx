'use client';

import { useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import {
  SelectField,
  SwitchField,
  ToggleGroupField,
  Typography,
  Workspace,
} from '@/components/shared';
import { FormProvider, useForm } from 'react-hook-form';
import { CurrencyType, LanguageType } from '@/domains/model/types';

type NotificationsType = 'security' | 'terms' | 'operations';

type SettingOptionType = {
  id: number;
  value: NotificationsType;
  label: string;
  description: string;
};

const socialLinks = [
  {
    type: 'chat',
    href: '#',
    label: 'Чат поддержки',
  },
  {
    type: 'telegram',
    href: '#',
    label: 'Telegram',
  },
  {
    type: 'whatsapp',
    href: '#',
    label: 'WhatsApp',
  },
];

const settingsOptions: SettingOptionType[] = [
  {
    id: 1,
    value: 'security',
    label: 'Безопасность',
    description: 'входы в аккаунт, подозрительная активность',
  },
  {
    id: 2,
    value: 'terms',
    label: 'Условия и тарифы',
    description: 'изменения условий обслуживания',
  },
  {
    id: 3,
    value: 'operations',
    label: 'Операции',
    description: 'переводы, статус, отмены, возвраты',
  },
];

const currencies = [
  {
    label: 'Российский рубль (RUB)',
    value: 'RUB',
  },
  {
    label: 'Доллар США (USD)',
    value: 'USD',
  },
  {
    label: 'Евро (EUR)',
    value: 'EUR',
  },
];

const languageOptions = [
  {
    label: 'Русский',
    value: 'ru',
  },
  {
    label: 'Английский',
    value: 'en',
  },
];

export const SettingsView = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLang = params?.lang || 'ru';

  const [notifications, setNotifications] = useState<
    Record<NotificationsType, boolean>
  >({
    security: true,
    terms: true,
    operations: true,
  });

  const methods = useForm<{
    currency: CurrencyType;
    language: LanguageType;
    notifications: {
      security: boolean;
      terms: boolean;
      operations: boolean;
    };
  }>({
    defaultValues: {
      language: 'ru',
      currency: 'RUB',
      notifications: {
        security: true,
        terms: true,
        operations: true,
      },
    },
  });

  const { handleSubmit } = methods;

  const toggleNotification = (key: NotificationsType) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLangChange = (newLang: string[]) => {
    if (newLang === currentLang) return;

    const segments = pathname.split('/');
    segments[1] = newLang[0];
    router.push(segments.join('/'));
  };

  const onSubmit = (data: any) => {};

  return (
    <Workspace>
      <Typography variant="h2" as="h2">
        Настройки
      </Typography>

      <div className="flex flex-col flex-wrap items-start gap-6 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6 md:gap-3">
        <FormProvider {...methods}>
          <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2">
              <SelectField
                name="currency"
                label="Основная валюта"
                options={currencies}
              />
              <ToggleGroupField
                name="language"
                options={languageOptions}
                label="Язык интерфейса"
                onValueChange={handleLangChange}
              />
            </div>

            <div className="flex w-full flex-col gap-3">
              <Typography variant="h5" as="h5">
                Уведомления
              </Typography>

              <div className="flex flex-col gap-4 divide-y divide-border">
                {settingsOptions.map(({ id, value, label, description }) => {
                  return (
                    <div key={id} className="flex items-center justify-between">
                      <div className="flex w-full flex-col gap-0.5">
                        <Typography
                          variant="body"
                          as="span"
                          className="font-semibold"
                        >
                          {label}
                        </Typography>
                        <Typography variant="description" as="span">
                          {description}
                        </Typography>
                      </div>
                      <SwitchField
                        name={`notifications.${value}`}
                        className="max-w-8 shrink-0"
                        onClick={() => toggleNotification(value)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </FormProvider>

        <div className="flex flex-col gap-3">
          <Typography variant="h5" as="h5">
            Поддержка
          </Typography>
          <div className="flex flex-col gap-x-6 gap-y-2 text-sm font-semibold text-primary sm:grid-cols-none sm:flex-row">
            {socialLinks.map(({ type, label, href }) => (
              <a
                key={type}
                href={href}
                target="_blank"
                className="hover:underline"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Workspace>
  );
};
