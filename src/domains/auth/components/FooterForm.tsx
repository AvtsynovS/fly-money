import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type FooterFormProps = {
  confirmText: string;
  isLoading: boolean;
  cancelText?: string;
  className?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
};

export const FooterForm = ({
  confirmText,
  isLoading,
  cancelText,
  className,
  onConfirm,
  onCancel,
}: FooterFormProps) => {
  return (
    <div
      className={cn(
        cancelText ? 'grid grid-cols-2 gap-1 sm:gap-4' : 'flex w-full',
        className,
      )}
    >
      {cancelText && (
        <Button
          type="button"
          variant="outline"
          className="w-full"
          disabled={isLoading}
          onClick={onCancel}
        >
          {cancelText}
        </Button>
      )}

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
        onClick={onConfirm}
      >
        {confirmText}
      </Button>
    </div>
  );
};
