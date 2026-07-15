'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
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

import { saveAuthSession } from '../lib/auth-storage';
import { resolveCallbackUrl } from '../lib/resolve-callback-url';
import {
  loginSchema,
  type LoginFormData,
} from '../schemas/login.schema';
import {
  AuthApiError,
  loginRequest,
  resendVerificationRequest,
} from '../services/auth.service';
import { SocialAuthButtons } from './social-auth-buttons';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = resolveCallbackUrl(searchParams.get('callbackUrl'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (searchParams.get('reason') === 'session_expired') {
      toast.info('Sua sessão expirou. Faça login novamente.');
    }
  }, [searchParams]);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: LoginFormData) {
    setIsSubmitting(true);
    setUnverifiedEmail(null);

    try {
      const response = await loginRequest(data);
      saveAuthSession(response.accessToken, response.user);
      toast.success('Login realizado com sucesso!');
      router.push(callbackUrl);
    } catch (error) {
      if (
        error instanceof AuthApiError &&
        (error.code === 'EMAIL_NOT_VERIFIED' ||
          error.message.toLowerCase().includes('não validado'))
      ) {
        setUnverifiedEmail(data.email);
        toast.error(error.message);
      } else {
        toast.error(
          error instanceof Error ? error.message : 'Erro ao fazer login',
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!unverifiedEmail) {
      return;
    }

    setIsResending(true);
    try {
      const response = await resendVerificationRequest(unverifiedEmail);
      toast.success(response.message);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao reenviar e-mail',
      );
    } finally {
      setIsResending(false);
    }
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Bem-vindo de volta
        </h1>
        <p className='text-muted-foreground text-sm'>
          Entre na sua conta Soccer Predictions
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input
                    type='email'
                    placeholder='voce@exemplo.com'
                    autoComplete='email'
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
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex items-center justify-between'>
                  <FormLabel>Senha</FormLabel>
                  <Link
                    href='/forgot-password'
                    className='text-muted-foreground hover:text-primary text-xs transition-colors'
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <FormControl>
                  <PasswordInput
                    autoComplete='current-password'
                    className='h-11'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {unverifiedEmail ? (
            <div className='bg-muted/50 space-y-3 rounded-lg border p-3'>
              <p className='text-muted-foreground text-sm'>
                Seu e-mail ainda não foi validado. Reenvie o link para{' '}
                <span className='text-foreground font-medium'>
                  {unverifiedEmail}
                </span>
                .
              </p>
              <Button
                type='button'
                variant='secondary'
                className='w-full'
                disabled={isResending}
                onClick={() => void handleResend()}
              >
                {isResending ? 'Reenviando...' : 'Reenviar validação'}
              </Button>
            </div>
          ) : null}

          <Button
            type='submit'
            size='lg'
            className='h-11 w-full'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </Form>

      <SocialAuthButtons />

      <p className='text-muted-foreground text-center text-sm'>
        Não tem uma conta?{' '}
        <Link
          href='/register'
          className='text-primary font-medium hover:underline'
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
