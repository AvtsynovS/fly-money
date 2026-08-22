'use client';

import { useEffect } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@ui/card';
import { Progress } from '@ui/progress';

import { useAuthRegistrationStore } from '../store/auth.store';
import { PhoneStep } from './PhoneStep';
import { CodeStep } from './CodeStep';
import { CitizenshipStep } from './CitizenshipStep';
import { PassportStep } from './PassportStep';
import { AddressStep } from './AddressStep';
import { VerifyStep } from './VerifyStep';
import { SuccessStep } from './SuccessStep';
import { Typography } from '@/components/shared';

export const RegisterStepper = () => {
  const { step, resetRegistration } = useAuthRegistrationStore();

  const progressValue = Math.min(((step - 1) / 6) * 100, 100);

  useEffect(() => {
    resetRegistration();
  }, [resetRegistration]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PhoneStep />;
      case 2:
        return <CodeStep />;
      case 3:
        return <CitizenshipStep />;
      case 4:
        return <PassportStep />;
      case 5:
        return <AddressStep />;
      case 6:
        return <VerifyStep />;
      case 7:
        return <SuccessStep />;
      default:
        return <PhoneStep />;
    }
  };

  return (
    <Card className="w-full border-muted/40 shadow-lg">
      <CardHeader className="space-y-px">
        <div className="flex items-center justify-between">
          <CardTitle>
            <Typography variant="h4" as="h4">
              Регистрация профиля
            </Typography>
          </CardTitle>
        </div>

        <Progress
          value={progressValue}
          className="h-2 transition-all duration-300"
        />
        <Typography variant="hint" as="span" className="text-right">
          Шаг {Math.min(step, 6)} из 6
        </Typography>
      </CardHeader>

      <CardContent>{renderStep()}</CardContent>
    </Card>
  );
};
