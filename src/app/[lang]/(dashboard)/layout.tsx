'use client';

import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/shared';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <AppSidebar />
        <main className="relative flex-1 overflow-y-auto bg-background p-3 sm:p-6 md:p-10">
          <div className="mb-2 flex items-center md:hidden">
            <SidebarTrigger className="border border-border p-2" />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
