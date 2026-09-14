'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { cn } from '@lib/utils';
import { LogoIcon } from '@/lib/assets';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Typography } from '@/components/shared';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  User,
  History,
  ShieldCheck,
  TrendingDown,
  Lock,
  Settings,
  Folder,
  MessageSquare,
} from 'lucide-react';

const sidebarItems = [
  { name: 'Профиль', href: '/profile', icon: User },
  { name: 'История переводов', href: '/transfers', icon: History },
  { name: 'Верификация', href: '/verification', icon: ShieldCheck },
  { name: 'Лимиты', href: '/limits', icon: TrendingDown },
  { name: 'Безопасность', href: '/security', icon: Lock },
  { name: 'Настройки', href: '/settings', icon: Settings },
  { name: 'Документы', href: '/documents', icon: Folder },
  { name: 'Поддержка', href: '/support', icon: MessageSquare },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const params = useParams();
  const lang = params?.lang || 'ru';

  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-2">
          <LogoIcon />
          <span className="font-brand text-2xl font-extrabold tracking-tight select-none">
            <span className="text-brand-fly">Fly</span>
            <span className="text-brand-money">Money</span>
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-6 px-4">
        <div className="flex flex-col gap-4 px-2">
          <div className="flex items-center gap-3 py-1">
            <Avatar className="h-10 w-10 border border-sidebar-border">
              <AvatarImage src="" alt="avatar" />
              <AvatarFallback>ИИ</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Typography
                variant="body"
                as="span"
                className="mb-1 leading-none font-semibold"
              >
                Иван Иванов
              </Typography>
              <Typography
                variant="description"
                as="span"
                className="text-xs leading-none"
              >
                +7 900 xxx-xx-89
              </Typography>
            </div>
          </div>
          <Separator className="bg-sidebar-border" />
        </div>
        <SidebarMenu className="gap-1">
          {sidebarItems.map((item) => {
            const localizedHref = `/${lang}${item.href}`;
            const isActive = pathname === localizedHref;
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  isActive={isActive}
                  className={cn(
                    'w-full px-3 py-5 text-sm transition-all duration-200',
                    isActive
                      ? 'bg-sidebar-accent font-semibold text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                  )}
                >
                  <Link
                    href={localizedHref}
                    className="flex items-center gap-2"
                  >
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 transition-transform group-hover:scale-115',
                        isActive
                          ? 'text-sidebar-primary'
                          : 'text-sidebar-foreground/40',
                      )}
                    />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        {/* Выхода из аккаунта и переключатель тем */}
      </SidebarFooter>
    </Sidebar>
  );
}
