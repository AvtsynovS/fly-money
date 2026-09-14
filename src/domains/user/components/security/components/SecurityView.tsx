'use client';

import { useParams, useRouter } from 'next/navigation';
import { List, ListItem, Typography, Workspace } from '@/components/shared';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const securityOptions = [
  {
    id: 1,
    name: 'Двухфакторная аутентификация',
    description: 'вход по коду из SMS/приложения',
  },
  {
    id: 2,
    name: 'Активные сессии',
    description: 'устройства, с которых выполнен вход',
  },
];
// TODO подключить Zustand
// TODO настроить моки

export const SecurityView = () => {
  const router = useRouter();
  const params = useParams();
  const lang = params?.lang || 'ru';

  const handleDocumentsClick = () => {
    router.push(`/${lang}/documents`);
  };

  return (
    <Workspace>
      <Typography variant="h2" as="h2">
        Безопасность
      </Typography>
      <div className="flex flex-col flex-wrap items-start gap-6 rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Typography variant="h4" as="h4">
            Раздел безопасности
          </Typography>
          <Badge variant="secondary">Скоро в приложении</Badge>
        </div>
        <List variant="custom">
          {securityOptions.map(({ id, name, description }) => {
            return (
              <ListItem key={id}>
                <div className="flex gap-2">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-semibold">{name}</span>
                </div>
                <span className="text-muted-foreground">{description}</span>
              </ListItem>
            );
          })}
        </List>
        <Button
          className="w-full font-semibold sm:w-auto"
          variant="link"
          onClick={handleDocumentsClick}
        >
          Пользовательское соглашение
        </Button>
      </div>
    </Workspace>
  );
};
