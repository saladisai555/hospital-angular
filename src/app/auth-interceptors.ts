import {
  Injectable
} from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor
  implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ) {

    const isAuthRequest =
      request.url.includes('/api/auth/login') ||
      request.url.includes('/api/auth/register');

    if (isAuthRequest) {
      return next.handle(request);
    }

    const token =
      this.authService.getToken();

    if (!token) {
      return next.handle(request);
    }

    const authRequest =
      request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

    return next.handle(authRequest);
  }
}