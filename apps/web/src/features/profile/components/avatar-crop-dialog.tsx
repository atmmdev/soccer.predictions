'use client';

import { useState } from 'react';
import Cropper, { type Area, type Point } from 'react-easy-crop';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

import { cropAvatar } from '../lib/crop-image';

interface AvatarCropDialogProps {
  imageSource: string | null;
  onCancel: () => void;
  onConfirm: (avatarDataUrl: string) => void;
}

export function AvatarCropDialog({
  imageSource,
  onCancel,
  onConfirm,
}: AvatarCropDialogProps) {
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  async function handleConfirm() {
    if (!imageSource || !croppedArea) {
      return;
    }

    setIsCropping(true);

    try {
      onConfirm(await cropAvatar(imageSource, croppedArea));
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Não foi possível recortar a imagem.',
      );
    } finally {
      setIsCropping(false);
    }
  }

  return (
    <Dialog open={Boolean(imageSource)} onOpenChange={open => !open && onCancel()}>
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle>Ajustar foto do perfil</DialogTitle>
          <DialogDescription>
            Arraste e aproxime a imagem. A foto será salva em 100 × 100 pixels.
          </DialogDescription>
        </DialogHeader>

        <div className='relative h-72 overflow-hidden rounded-lg bg-black'>
          {imageSource ? (
            <Cropper
              image={imageSource}
              crop={crop}
              zoom={zoom}
              aspect={1}
              cropShape='round'
              showGrid={false}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(_, pixels) => setCroppedArea(pixels)}
            />
          ) : null}
        </div>

        <div className='space-y-2'>
          <Label htmlFor='avatar-zoom'>Zoom</Label>
          <input
            id='avatar-zoom'
            type='range'
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={event => setZoom(Number(event.target.value))}
            className='accent-primary w-full'
          />
        </div>

        <DialogFooter>
          <Button type='button' variant='outline' onClick={onCancel}>
            Cancelar
          </Button>
          <Button
            type='button'
            onClick={handleConfirm}
            disabled={!croppedArea || isCropping}
          >
            {isCropping ? 'Recortando...' : 'Usar esta foto'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
