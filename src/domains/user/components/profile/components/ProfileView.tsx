'use client';

import { Button } from '@ui/button';
import { ProfileLinksPanel } from './ProfileLinksPanel';
import { Typography, Workspace } from '@/components/shared';
import { Badge } from '@/components/ui/badge';
import { useParams, useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BadgeCheck, BadgeX } from 'lucide-react';

// TODO подключить Zustand
// TODO настроить моки

export const ProfileView = () => {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'ru';

  const handleVerifyClick = () => {
    router.push(`/${lang}/verification`);
  };

  return (
    <Workspace>
      <Typography variant="h2" as="h2">
        Профиль
      </Typography>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="flex h-full w-full flex-col border-muted/40 shadow-lg">
          <CardHeader className="space-y-px">
            <div className="flex items-center justify-between">
              <CardTitle>
                <Typography variant="h4" as="h4">
                  Личные данные
                </Typography>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <Typography variant="body" as="span">
                  Телефон
                </Typography>
                <Badge>
                  <BadgeCheck data-icon="inline-start" />
                  подтверждён
                </Badge>
              </div>
              <Typography variant="description" as="span">
                +7 900 xxx-xx-89
              </Typography>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <Typography variant="body" as="span">
                  E-mail
                </Typography>

                <Badge variant="destructive">
                  <BadgeX data-icon="inline-start" />
                  подтверждён
                </Badge>
              </div>
              <Typography variant="description" as="span">
                druxxxxx1981@gmail.com
              </Typography>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="font-semibold sm:w-auto" variant="link">
              Изменить данные
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex h-full w-full flex-col border-muted/40 shadow-lg">
          <CardHeader className="space-y-px">
            <div className="flex items-center justify-between">
              <CardTitle>
                <Typography variant="h4" as="h4">
                  Статус верификации
                </Typography>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-1 gap-3">
            <Badge variant="destructive">Не пройдена</Badge>
            <Typography variant="description" as="p">
              Верификация не пройдена, доступны переводы с ограничением по
              сумме.
            </Typography>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleVerifyClick}>
              Пройти верификацию
            </Button>
          </CardFooter>
        </Card>
      </div>

      <ProfileLinksPanel />
    </Workspace>
  );
};
