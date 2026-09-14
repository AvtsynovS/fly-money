import { RegisterStepper } from '@/domains/auth';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-lg space-y-6">
        <RegisterStepper />
      </div>
    </div>
  );
}
