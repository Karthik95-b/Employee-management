import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
  const platformId = inject(PLATFORM_ID);
  // Ensure we're running in the browser
  if (isPlatformBrowser(platformId)) {
    const user = localStorage.getItem('user');

    if (user) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }
  return false;
};
