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

import {
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from '../schemas/forgot-password.schema';
import { forgotPasswordRequest } from '../services/auth.service';

export function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: ForgotPasswordFormData) {
    setIsSubmitting(true);

    try {
      const response = await forgotPasswordRequest(data.email);
      setSuccessMessage(response.message);
      toast.success('Solicitação enviada');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao solicitar redefinição',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (successMessage) {
    return (
      <div className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Verifique seu e-mail
          </h1>
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {successMessage}
          </p>
          <p className='text-muted-foreground text-xs leading-relaxed'>
            Se o e-mail não chegar em alguns minutos, confira a pasta de spam.
            Em desenvolvimento (e-mail desativado), o link também aparece no
            terminal da API.
          </p>
        </div>

        <Button asChild variant='outline' size='lg' className='h-11 w-full'>
          <Link href='/login'>Voltar para entrar</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>
          Esqueceu a senha?
        </h1>
        <p className='text-muted-foreground text-sm'>
          Informe seu e-mail para receber um link de redefinição
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

          <Button
            type='submit'
            size='lg'
            className='h-11 w-full'
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar link'}
          </Button>
        </form>
      </Form>

      <p className='text-muted-foreground text-center text-sm'>
        Lembrou a senha?{' '}
        <Link href='/login' className='text-primary font-medium hover:underline'>
          Entrar
        </Link>
      </p>
    </div>
  );
}
