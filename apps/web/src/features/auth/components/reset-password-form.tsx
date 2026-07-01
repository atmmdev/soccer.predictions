'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';

import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from '../schemas/reset-password.schema';
import { resetPasswordRequest } from '../services/auth.service';

function InvalidResetLink() {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <h1 className='text-2xl font-semibold tracking-tight'>Link inválido</h1>
        <p className='text-muted-foreground text-sm'>
          Solicite um novo link de redefinição de senha.
        </p>
      </div>

      <Button asChild size='lg' className='h-11 w-full'>
        <Link href='/forgot-password'>Solicitar novo link</Link>
      </Button>
    </div>
  );
}

function ResetPasswordFormContent({ token }: { token: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: ResetPasswordFormData) {
    setIsSubmitting(true);

    try {
      const response = await resetPasswordRequest({
        token,
        password: data.password,
      });
      toast.success(response.message);
      router.push('/login');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao redefinir senha',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Nova senha</h1>
        <p className='text-muted-foreground text-sm'>
          Escolha uma nova senha para sua conta
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova senha</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete='new-password'
                    className='h-11'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar nova senha</FormLabel>
                <FormControl>
                  <PasswordInput
                    autoComplete='new-password'
                    className='h-11'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            size='lg'
            className='h-11 w-full'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Salvando...' : 'Redefinir senha'}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    return <InvalidResetLink />;
  }

  return <ResetPasswordFormContent token={token} />;
}
