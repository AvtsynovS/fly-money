import { cn } from '@/lib/utils';

export const FieldError = ({
  className,
  children,
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  if (!children) return null;

  return (
    <p className={cn('ml-3 text-xs font-medium text-destructive', className)}>
      {children}
    </p>
  );
};
