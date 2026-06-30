import type { Metadata } from 'next';

import { AuthShell } from '@/features/auth/components/auth-shell';
import { RegisterForm } from '@/features/auth/components/register-form';

export const metadata: Metadata = {
  title: 'Cadastrar | Soccer Predictions',
  description: 'Crie sua conta no Soccer Predictions',
};

export default function RegisterPage() {
  return (
    <AuthShell>
      <RegisterForm />
    </AuthShell>
  );
}
