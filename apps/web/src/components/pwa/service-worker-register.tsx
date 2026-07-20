'use client';

import { useEffect } from 'react';

function reloadOnceForUpdate(): void {
  if (sessionStorage.getItem('sw-update-reload') === '1') {
    return;
  }

  sessionStorage.setItem('sw-update-reload', '1');
  window.location.reload();
}

export function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      process.env.NODE_ENV !== 'production' ||
      !('serviceWorker' in navigator)
    ) {
      return;
    }

    void navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        void registration.update();

        if (registration.waiting && navigator.serviceWorker.controller) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
          reloadOnceForUpdate();
          return;
        }

        registration.addEventListener('updatefound', () => {
          const installing = registration.installing;

          if (!installing) {
            return;
          }

          installing.addEventListener('statechange', () => {
            if (
              installing.state === 'activated' &&
              navigator.serviceWorker.controller
            ) {
              reloadOnceForUpdate();
            }
          });
        });
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  }, []);

  return null;
}
