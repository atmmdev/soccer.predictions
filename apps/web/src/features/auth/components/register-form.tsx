'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

import { saveAuthSession } from '../lib/auth-storage';
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/register.schema';
import { registerRequest } from '../services/auth.service';
import { SocialAuthButtons } from './social-auth-buttons';

export function RegisterForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        name: data.name,
        email: data.email,
        password: data.password,
      });
      saveAuthSession(response.accessToken, response.user);
      toast.success('Conta criada com sucesso!');
      router.push('/dashboard');
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Erro ao criar conta',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='space-y-6'>
      <div className='space-y-1'>
        <h1 className='text-2xl font-semibold tracking-tight'>Criar conta</h1>
        <p className='text-muted-foreground text-sm'>
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
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Seu nome'
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
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    type='password'
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
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <Input
                    type='password'
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
