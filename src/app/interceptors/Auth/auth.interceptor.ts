import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.validateToken().pipe(
            map(() => true),
            catchError(() => {
              localStorage.removeItem('user');
              this.router.navigate(['/login']);
              return of(false);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
