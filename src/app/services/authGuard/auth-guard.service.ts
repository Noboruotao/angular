import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../authService/auth.service';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this.authService.userValue;
    if (!user) {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      return false;
    }
    return this.authService.validateToken().pipe(
      map(() => true),
      catchError(() => {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
