import {
  CanActivateFn,
  Router
} from '@angular/router';

import { inject } from '@angular/core';

import { AuthService } from '../../services/auth.service';

import { APP_ROUTES } from '../constants/app-routes';

export const authGuard: CanActivateFn = (route) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {

    return router.createUrlTree([
      APP_ROUTES.AUTH.LOGIN
    ]);

  }

  const allowedRoles =
    route.data['roles'] as string[] | undefined;

  if (!allowedRoles || allowedRoles.length === 0) {
    return true;
  }

  const user = authService.getUser();

  if (
    user &&
    allowedRoles.includes(user.role)
  ) {
    return true;
  }

  return router.createUrlTree([
    APP_ROUTES.PATIENT.DOCTORS
  ]);
};