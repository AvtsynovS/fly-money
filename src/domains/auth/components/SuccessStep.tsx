'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@ui/button';
import { CheckIcon } from 'lucide-react';

import { useAuthRegistrationStore } from '../store/auth.store';
import { Typography } from '@/components/shared';

export const SuccessStep = () => {
  const router = useRouter();
  const { resetRegistration } = useAuthRegistrationStore();
  const [secondsLeft, setSecondsLeft] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    resetRegistration();
    router.push('/ru/profile');
  };

  return (
    <div className="space-y-6 py-4 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
        <CheckIcon className="h-10 w-10 text-success" />
      </div>

      <div className="space-y-2">
        <Typography variant="h3" as="h3">
          Профиль успешно создан!
        </Typography>
        <Typography variant="description" as="p">
          Ваш аккаунт успешно зарегистрирован в системе FlyMoney. Теперь вам
          доступны международные переводы.
        </Typography>
      </div>

      <div className="space-y-3 pt-4">
        <Button onClick={handleRedirect} className="w-full">
          Войти в личный кабинет
        </Button>
        <Typography variant="hint" as="p">
          Автоматический переход через{' '}
          <span className="font-medium text-foreground">
            {secondsLeft} сек.
          </span>
        </Typography>
      </div>
    </div>
  );
};
