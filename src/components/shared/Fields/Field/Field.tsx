import { cn } from '@/lib/utils';

type FieldProps = React.HTMLAttributes<HTMLDivElement>;

export const Field = ({ className, ...props }: FieldProps) => {
  return (
    <div className={cn('flex w-full flex-col gap-1.5', className)} {...props} />
  );
};
