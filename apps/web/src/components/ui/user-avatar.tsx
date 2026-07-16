import { getUserInitials } from '@/features/auth/lib/role-access';
import { cn } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';

interface UserAvatarProps {
  name: string;
  avatarDataUrl?: string | null;
  className?: string;
  fallbackClassName?: string;
}

export function UserAvatar({
  name,
  avatarDataUrl,
  className,
  fallbackClassName,
}: UserAvatarProps) {
  return (
    <Avatar className={cn('size-8', className)}>
      {avatarDataUrl ? (
        <AvatarImage src={avatarDataUrl} alt={`Foto de ${name}`} />
      ) : null}
      <AvatarFallback
        className={cn('bg-muted text-xs font-medium', fallbackClassName)}
      >
        {getUserInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
}
