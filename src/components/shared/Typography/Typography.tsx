import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@lib/utils';

const typographyVariants = cva(
  'text-foreground transition-colors duration-200',
  {
    variants: {
      variant: {
        h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0',
        h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
        h4: 'scroll-m-20 text-xl font-bold tracking-tight text-foreground',
        h5: 'scroll-m-20 text-lg font-semibold',
        h6: 'scroll-m-20 text-base font-semibold text-muted-foreground',
        description:
          'text-sm leading-relaxed font-normal text-muted-foreground',
        hint: 'block text-xs font-normal tracking-wide text-muted-foreground/80',
        body: 'leading-7 [&:not(:first-child)]:mt-6',
      },
    },
    defaultVariants: {
      variant: 'body',
    },
  },
);

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, as, ...props }, ref) => {
    const Component =
      as ||
      (variant && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)
        ? (variant as any)
        : 'p');

    return (
      <Component
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Typography.displayName = 'Typography';
