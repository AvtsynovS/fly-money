'use client';

import { Typography, Workspace } from '@/components/shared';
import { MoveRight } from 'lucide-react';
import { useParams } from 'next/navigation';

// TODO добавить заглушку на роуты
const documentItems = [
  { id: 'privacy', name: 'Политика конфиденциальности', href: '/privacy' },
  { id: 'cookie', name: 'Политика файлов cookie', href: '/cookie' },
  { id: 'terms', name: 'Пользовательское соглашение', href: '/terms' },
  { id: 'pnd', name: 'Обработка персональных данных', href: '/pnd' },
];

// TODO подключить Zustand
// TODO настроить моки

export const DocumentsView = () => {
  const params = useParams();
  const lang = params?.lang || 'ru';

  return (
    <Workspace>
      <Typography variant="h2" as="h2">
        Документы
      </Typography>

      <div className="divide-y divide-border rounded-xl border border-border bg-card p-4 shadow-sm sm:p-6">
        {documentItems.map(({ id, name, href }, index) => (
          <div
            key={id}
            className={`flex items-center justify-between py-4 text-sm ${
              index === 0 ? 'pt-2' : ''
            } ${index === documentItems.length - 1 ? 'pb-2' : ''}`}
          >
            <Typography variant="body" as="span" className="font-semibold">
              {name}
            </Typography>
            <a
              href={`/${lang}/${href}`}
              target="_blank"
              className="flex items-center gap-1 font-semibold text-primary transition-all hover:underline"
            >
              Открыть <MoveRight className="h-4 w-4" />
            </a>
          </div>
        ))}
      </div>
    </Workspace>
  );
};
