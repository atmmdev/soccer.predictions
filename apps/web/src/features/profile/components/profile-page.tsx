'use client';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Camera, LogOut, Save, Shield, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageLoading } from '@/components/ui/page-loading';
import {
  getAccessToken,
  updateStoredUser,
} from '@/features/auth/lib/auth-storage';
import { getUserInitials } from '@/features/auth/lib/role-access';
import {
  fetchMeRequest,
  updateProfileRequest,
} from '@/features/auth/services/auth.service';
import type { AuthUser, UserRole } from '@/features/auth/types/auth';
import { isFullName } from '@/features/auth/utils/full-name';
import { getFetchErrorMessage } from '@/lib/api-client';

import { AvatarCropDialog } from './avatar-crop-dialog';

const MAX_SOURCE_IMAGE_SIZE = 10 * 1024 * 1024;

function formatPhoneInput(value: string | null): string {
  if (!value) {
    return '';
  }

  let digits = value.replace(/\D/g, '');
  if (digits.startsWith('55') && digits.length > 11) {
    digits = digits.slice(2);
  }
  digits = digits.slice(0, 11);

  if (digits.length <= 2) {
    return digits ? `(${digits}` : '';
  }
  if (digits.length <= 6) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function normalizePhone(value: string): string | null {
  const digits = value.replace(/\D/g, '');
  return digits ? `+55${digits}` : null;
}

const ROLE_LABELS: Record<UserRole, string> = {
  SUPER_ADMIN: 'Super administrador',
  ADMIN: 'Administrador',
  PARTICIPANT: 'Participante',
};

function ProfileField({ label, value }: { label: string; value: string }) {
  return (
    <div className='space-y-1'>
      <p className='text-muted-foreground text-xs font-medium uppercase tracking-wide'>
        {label}
      </p>
      <p className='text-sm'>{value}</p>
    </div>
  );
}

export function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const [cropSource, setCropSource] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      void Promise.resolve().then(() => setIsLoading(false));
      return;
    }

    void fetchMeRequest(token)
      .then(loadedUser => {
        setUser(loadedUser);
        setName(loadedUser.name);
        setPhone(formatPhoneInput(loadedUser.phone));
        setAvatarDataUrl(loadedUser.avatarDataUrl);
      })
      .catch(loadError => {
        setError(
          getFetchErrorMessage(
            loadError,
            'Não foi possível carregar o perfil.',
          ),
        );
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(
    () => () => {
      if (cropSource?.startsWith('blob:')) {
        URL.revokeObjectURL(cropSource);
      }
    },
    [cropSource],
  );

  function handleImageSelection(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = '';

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Selecione um arquivo de imagem.');
      return;
    }

    if (file.size > MAX_SOURCE_IMAGE_SIZE) {
      toast.error('A imagem original deve ter no máximo 10 MB.');
      return;
    }

    setCropSource(URL.createObjectURL(file));
  }

  function closeCropDialog() {
    setCropSource(null);
  }

  function handleCropConfirm(croppedAvatar: string) {
    setAvatarDataUrl(croppedAvatar);
    closeCropDialog();
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedName = name.trim().replace(/\s+/g, ' ');
    const normalizedPhone = normalizePhone(phone);

    if (!isFullName(normalizedName)) {
      toast.error('Informe nome e sobrenome.');
      return;
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits && ![10, 11].includes(phoneDigits.length)) {
      toast.error('Informe um telefone válido com DDD.');
      return;
    }

    const token = getAccessToken();

    if (!token) {
      toast.error('Sua sessão expirou. Entre novamente.');
      return;
    }

    setIsSaving(true);

    try {
      const updatedUser = await updateProfileRequest(token, {
        name: normalizedName,
        phone: normalizedPhone,
        avatarDataUrl,
      });
      setUser(updatedUser);
      setName(updatedUser.name);
      setPhone(formatPhoneInput(updatedUser.phone));
      setAvatarDataUrl(updatedUser.avatarDataUrl);
      updateStoredUser(updatedUser);
      router.refresh();
      toast.success('Perfil atualizado com sucesso!');
    } catch (saveError) {
      toast.error(
        getFetchErrorMessage(saveError, 'Não foi possível atualizar o perfil.'),
      );
    } finally {
      setIsSaving(false);
    }
  }

  if (isLoading) {
    return <PageLoading label='Carregando perfil...' />;
  }

  if (error || !user) {
    return (
      <Card>
        <CardContent className='py-12 text-center'>
          <p className='text-destructive text-sm'>
            {error ?? 'Perfil indisponível.'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className='grid gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]'>
      <Card>
        <CardHeader>
          <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left'>
            <div className='relative w-fit'>
              <Avatar className='size-[100px]'>
                {avatarDataUrl ? (
                  <AvatarImage
                    src={avatarDataUrl}
                    alt={`Foto de ${user.name}`}
                  />
                ) : null}
                <AvatarFallback className='text-2xl font-semibold'>
                  {getUserInitials(name)}
                </AvatarFallback>
              </Avatar>
              <Button
                type='button'
                size='icon-sm'
                className='absolute -right-1 -bottom-1 rounded-full'
                onClick={() => fileInputRef.current?.click()}
                aria-label='Alterar foto do perfil'
              >
                <Camera className='size-4' />
              </Button>
              <input
                ref={fileInputRef}
                type='file'
                accept='image/jpeg,image/png,image/webp'
                className='sr-only'
                onChange={handleImageSelection}
              />
            </div>
            <div className='min-w-0'>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription className='break-all'>
                {user.email}
              </CardDescription>
              <div className='mt-2 flex flex-wrap justify-center gap-2 sm:justify-start'>
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className='size-4' />
                  Alterar foto
                </Button>
                {avatarDataUrl ? (
                  <Button
                    type='button'
                    variant='ghost'
                    size='sm'
                    onClick={() => setAvatarDataUrl(null)}
                  >
                    <Trash2 className='size-4' />
                    Remover
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='grid gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='profile-name'>Nome completo</Label>
                <Input
                  id='profile-name'
                  value={name}
                  maxLength={120}
                  onChange={event => setName(event.target.value)}
                  disabled={isSaving}
                  autoComplete='name'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='profile-phone'>Telefone</Label>
                <Input
                  id='profile-phone'
                  type='tel'
                  value={phone}
                  maxLength={15}
                  placeholder='(11) 99999-9999'
                  onChange={event =>
                    setPhone(formatPhoneInput(event.target.value))
                  }
                  disabled={isSaving}
                  autoComplete='tel'
                  inputMode='tel'
                />
                <p className='text-muted-foreground text-xs'>
                  Será usado futuramente para notificações pelo WhatsApp.
                </p>
              </div>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <ProfileField label='E-mail' value={user.email} />
              <ProfileField label='Papel' value={ROLE_LABELS[user.role]} />
            </div>

            <p className='text-muted-foreground text-xs'>
              A foto é recortada e otimizada para 100 × 100 pixels antes do
              envio. E-mail e papel são dados protegidos da conta.
            </p>

            <Button type='submit' disabled={isSaving}>
              <Save className='size-4' />
              {isSaving ? 'Salvando...' : 'Salvar alterações'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className='flex flex-col gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Permissões</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <div className='flex items-center gap-2'>
              <Shield className='text-muted-foreground size-4' />
              <Badge>{ROLE_LABELS[user.role]}</Badge>
            </div>
            <p className='text-muted-foreground text-sm leading-relaxed'>
              {user.role === 'SUPER_ADMIN'
                ? 'Acesso total à plataforma, incluindo campeonatos e bolões de todos os usuários.'
                : user.role === 'ADMIN'
                  ? 'Você gerencia os bolões que criou, convida participantes e acompanha palpites.'
                  : 'Você participa dos bolões em que foi convidado e registra palpites nos jogos.'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='text-base'>Conta</CardTitle>
          </CardHeader>
          <CardContent className='space-y-3'>
            <p className='text-muted-foreground text-sm'>
              Atualizado em{' '}
              {format(new Date(), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}.
            </p>
            <Button asChild variant='outline' className='w-full'>
              <Link href='/logout'>
                <LogOut className='size-4' />
                Sair da conta
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <AvatarCropDialog
        imageSource={cropSource}
        onCancel={closeCropDialog}
        onConfirm={handleCropConfirm}
      />
    </div>
  );
}
