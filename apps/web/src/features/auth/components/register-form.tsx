'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
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
  registerSchema,
  type RegisterFormData,
} from '../schemas/register.schema';
import {
  registerRequest,
  resendVerificationRequest,
} from '../services/auth.service';
import { normalizeFullName } from '../utils/full-name';
import { SocialAuthButtons } from './social-auth-buttons';

export function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isResending, setIsResending] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: RegisterFormData) {
    setIsSubmitting(true);

    try {
      const response = await registerRequest({
        name: normalizeFullName(data.name),
        email: data.email,
        password: data.password,
      });

      if ('requiresEmailVerification' in response) {
        setPendingEmail(response.email);
        toast.success('Conta criada! Confira seu e-mail.');
        return;
      }

      toast.error('Resposta inesperada ao criar conta');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao criar conta',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!pendingEmail) {
      return;
    }

    setIsResending(true);
    try {
      const response = await resendVerificationRequest(pendingEmail);
      toast.success(response.message);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao reenviar e-mail',
      );
    } finally {
      setIsResending(false);
    }
  }

  if (pendingEmail) {
    return (
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Confirme seu e-mail
          </h1>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            Enviamos um link de validação para{' '}
            <span className='text-foreground font-medium'>{pendingEmail}</span>.
            Abra o e-mail e confirme para poder entrar.
          </p>
          <p className='text-muted-foreground text-xs leading-relaxed'>
            Em desenvolvimento, com e-mail desativado, o link também aparece no
            terminal da API.
          </p>
        </div>

        <Button
          type='button'
          size='lg'
          className='h-11 w-full'
          disabled={isResending}
          onClick={() => void handleResend()}
        >
          {isResending ? 'Reenviando...' : 'Reenviar e-mail'}
        </Button>

        <Button asChild variant='outline' size='lg' className='h-11 w-full'>
          <Link href='/login'>Ir para entrar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Criar conta</h1>
        <p className='text-muted-foreground text-xs'>
          Cadastre-se no Soccer Predictions
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>Nome e sobrenome</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Ex.: João Silva'
                    autoComplete='name'
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
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='text-xs'>E-mail</FormLabel>
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
                <FormLabel className='text-xs'>Senha</FormLabel>
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
                <FormLabel className='text-xs'>Confirmar senha</FormLabel>
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
            className='h-11 w-full uppercase tracking-widest'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>
      </Form>

      <SocialAuthButtons />

      <p className='text-muted-foreground text-center text-sm'>
        Já tem uma conta?{' '}
        <Link href='/login' className='text-primary font-medium hover:underline'>
          Entrar
        </Link>
      </p>
    </div>
  );
}
