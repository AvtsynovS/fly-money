import React from 'react';

interface LanguagePageProps {
  params: Promise<{
    lang: string;
  }>;
}

// TODO сделать редирект на профиль или регистрацию в зависимости от авторизации пользователя
export default async function LanguagePage({ params }: LanguagePageProps) {
  const { lang } = await params;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">
        FlyMoney Landing Page
      </h1>

      <p className="mt-2 text-muted-foreground">
        Текущий язык интерфейса:{' '}
        <span className="font-semibold text-primary uppercase">{lang}</span>
      </p>
    </div>
  );
}
