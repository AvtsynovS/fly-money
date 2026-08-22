import { cn } from '@/lib/utils';

export const FieldGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('space-y-1', className)} {...props} />;
};
