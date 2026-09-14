'use client';

import { Typography } from '@/components/shared';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const links = [
  {
    id: 1,
    title: 'Лимиты',
    description: 'До 60 000 ₽ упрощённая идентификация',
    href: '/limits',
  },
  {
    id: 2,
    title: 'Безопасность',
    description: 'Двухфакторная аутентификация, сессии',
    href: '/security',
  },
  {
    id: 3,
    title: 'Настройки',
    description: 'Валюта, язык, уведомления',
    href: '/settings',
  },
  {
    id: 4,
    title: 'Документы',
    description: 'Политика конфиденциальности, соглашение',
    href: '/documents',
  },
];

export const ProfileLinksPanel = () => {
  const params = useParams();
  const lang = params?.lang || 'ru';

  return (
    <div className="grid animate-in grid-cols-1 gap-3 duration-600 ease-out fade-in slide-in-from-bottom-4 sm:grid-cols-2 lg:grid-cols-4">
      {links.map(({ id, title, description, href }) => {
        return (
          <Link
            key={id}
            href={`/${lang}${href}`}
            className="block cursor-pointer space-y-1 rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:border-muted-foreground/30 hover:bg-accent/40 active:scale-[0.99]"
          >
            <Typography variant="h5" as="h5">
              {title}
            </Typography>
            <Typography variant="description" as="p">
              {description}
            </Typography>
          </Link>
        );
      })}
    </div>
  );
};
