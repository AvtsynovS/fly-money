import { cn } from 'cn';
import { LoaderIcon } from 'lucide-react';

const Spinner = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn('size-4 animate-spin', className)}
      {...props}
    />
  );
};

export const Loader = () => {
  return (
    <div className="flex items-center gap-4">
      <Spinner />
    </div>
  );
};
