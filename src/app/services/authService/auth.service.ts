import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<any>;

  public userData!: object;
  public roles!: object;
  public permissions!: object;

  storage!: Storage;

  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api`;

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem('user');
    const decodedUser = storedUser ? jwtDecode(storedUser) : null;

    this.userSubject = new BehaviorSubject<any>(decodedUser);
    this.user = this.userSubject.asObservable();
    this.storage = window.localStorage;
  }

  public get userValue() {
    return this.userSubject;
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
    return this.httpClient.post<any>(this.apiUrl + '/check', 'body').pipe(
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
          return res;
        },
        (error: any) => {
          console.log(error);
        }
      )
    );
  }


  checkPermission(permissions: String[]) {
    for (var permission of permissions) {
      if (
        Object.values(this.permissions).indexOf(permission) > -1
      ) {
        return true;
      }
    }
    return false;
  }

  checkRoles(roles: String[]) {
    for (var role of roles) {
      if (Object.values(this.roles).indexOf(role) > -1) {
        return true;
      }
    }
    return false;
  }
}
