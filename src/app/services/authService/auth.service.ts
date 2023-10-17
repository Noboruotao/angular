import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PessoaService } from '../pessoa/pessoa.service';
import { Pessoa } from 'src/app/interfaces/Pessoa/pessoa';
import { Check } from 'src/app/interfaces/login/login';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  public userData!: Pessoa;
  public roles!: any;
  public permissions!: any;

  storage!: Storage;

  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api`;

  constructor(
    private pessoaService: PessoaService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    const storedUser = localStorage.getItem('user');
    const decodedUser = storedUser ? jwtDecode(storedUser) : null;

    this.userSubject = new BehaviorSubject<any>(decodedUser);
    this.user = this.userSubject.asObservable();
    this.storage = window.localStorage;
  }

  public get userValue() {
    return this.userSubject;
  }

  public get userToken() {
    return localStorage.getItem('user');
  }

  login(formData: FormData) {
    return this.httpClient.post<any>(this.apiUrl + '/login', formData).pipe(
      map((userResponse) => {
        if (!userResponse.success) {
          return userResponse;
        }
        const token = userResponse.token;
        this.storage.setItem('user', token);

        const decodedUser = jwtDecode(token);
        this.userSubject.next(decodedUser);

        return userResponse;
      })
    );
  }

  validateToken() {
    return this.httpClient.post<Check>(this.apiUrl + '/check', 'body').pipe(
      map((response) => {
        if (!response.success) {
          return response;
        }
        this.userData = response.data;
        this.roles = response.roles;
        this.permissions = response.permissions;

        return response;
      })
    );
  }

  logout() {
    return this.httpClient.post<any>(`${this.apiUrl}/logout`, {}).pipe(
      map(
        (res: any) => {
          localStorage.removeItem('user');
          this.userSubject.next(false);
          // this.userData = User();
          this.roles = [];
          this.permissions = [];
          this.pessoaService.pessoaFoto = null;
          return res;
        },
        (error: any) => {
          console.log(error);
        }
      )
    );
  }

  private hasAnyMatch(source: string[], target: string[]): boolean {
    for (const item of source) {
      if (target.includes(item)) {
        return true;
      }
    }
    return false;
  }

  checkPermission(permissions: string[]): boolean {
    return this.hasAnyMatch(permissions, this.permissions);
  }

  checkRoles(roles: string[]): boolean {
    return this.hasAnyMatch(roles, this.roles);
  }

  can(items: string[]): boolean {
    return this.checkRoles(items) || this.checkPermission(items);
  }

  canAll(items: string[]): boolean {
    return this.checkRoles(items) && this.checkPermission(items);
  }

  permitPage(items: string[]) {
    if (!this.can(items)) {
      this.router.navigate(['/home']);
    }
  }

  blockPage(items: string[]) {
    if (this.can(items)) {
      this.router.navigate(['/home']);
    }
  }
}
