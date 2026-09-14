'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';

const listVariants = cva('space-y-3 text-sm', {
  variants: {
    variant: {
      // Empty marker (default)
      none: 'list-none pl-0 [&>li]:flex [&>li]:flex-wrap [&>li]:items-start [&>li]:gap-2.5',
      // Point marker
      disc: 'list-disc pl-5 [&>li]:list-item',
      // Numeric marker
      decimal: 'list-decimal pl-5 [&>li]:list-item',
      // Custom marker
      custom:
        'list-none pl-0 [&>li]:flex [&>li]:flex-wrap [&>li]:items-baseline [&>li]:gap-2.5',
    },
  },
  defaultVariants: {
    variant: 'none',
  },
});

interface ListProps
  extends
    React.ComponentPropsWithRef<'ul'>,
    VariantProps<typeof listVariants> {}

export const List = ({ className, variant, ref, ...props }: ListProps) => {
  return (
    <ul
      ref={ref}
      className={cn(listVariants({ variant, className }))}
      {...props}
    />
  );
};

interface ListItemProps extends React.ComponentPropsWithRef<'li'> {}

export const ListItem = ({ className, ref, ...props }: ListItemProps) => {
  return (
    <li
      ref={ref}
      className={cn(
        'flex flex-wrap items-center gap-2.5 leading-tight text-foreground/90',
        className,
      )}
      {...props}
    />
  );
};
