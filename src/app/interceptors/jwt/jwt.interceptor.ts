import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/authService/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  storage!: Storage;
  constructor(private accountService: AuthService) {
    this.storage = window.localStorage;
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user = this.accountService.userValue;
    const isLoggedIn = user != null ? true : false;
    const isApiUrl = request.url.startsWith(environment.baseApiUrl);

    console.log('aaaa');
    console.log(isLoggedIn);
    console.log(isApiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storage.getItem('user')}`,
        },
      });
    }

    return next.handle(request);
  }
}
