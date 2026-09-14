'use client';

import {
  Divider,
  List,
  ListItem,
  Typography,
  Workspace,
} from '@/components/shared';
import { CheckCircle2 } from 'lucide-react';

const residentsLimit = [
  {
    id: 1,
    service: 'До 15 000 ₽',
    condition: 'без идентификации',
  },
  {
    id: 2,
    service: 'До 60 000 ₽',
    condition: 'при упрощённой идентификации',
  },
  {
    id: 3,
    service: 'До 100 000 ₽',
    condition: 'при полной идентификации',
  },
];

const noResidentsLimit = [
  {
    id: 1,
    service: 'До 5 000 ₽',
    condition: 'без идентификации',
  },
  {
    id: 2,
    service: 'До 30 000 ₽',
    condition: 'при упрощённой идентификации',
  },
  {
    id: 3,
    service: 'До 40 000 ₽',
    condition: 'при полной идентификации',
  },
];

// TODO подключить Zustand
// TODO настроить моки

export const LimitsView = () => {
  return (
    <Workspace>
      <Typography variant="h2" as="h2">
        Лимиты
      </Typography>
      <div className="grid grid-cols-1 gap-6 rounded-xl border border-border bg-card p-8 shadow-sm md:grid-cols-[1fr_auto_1fr]">
        <div className="space-y-4">
          <Typography variant="h4" as="h4">
            Лимиты для резидентов
          </Typography>
          <List>
            {residentsLimit.map(({ id, service, condition }) => {
              return (
                <ListItem key={id}>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-semibold">{service}</span> —
                  <span className="text-muted-foreground">{condition}</span>
                </ListItem>
              );
            })}
          </List>
        </div>
        <Divider />
        <div className="space-y-4">
          <Typography variant="h4" as="h4">
            Лимиты для нерезидентов
          </Typography>
          <List variant="custom">
            {noResidentsLimit.map(({ id, service, condition }) => {
              return (
                <ListItem key={id}>
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="font-semibold">{service}</span> —
                  <span className="text-muted-foreground">{condition}</span>
                </ListItem>
              );
            })}
          </List>
        </div>
      </div>
    </Workspace>
  );
};
