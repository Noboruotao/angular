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
    return this.userSubject
    ;
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
      map(
        (res: any) => res,
        (error: any) => error
      )
    );
  }

  logout() {
    this.userSubject.next(false);
    return this.httpClient.post<any>(this.apiUrl + '/logout', 'body').pipe(
      map(
        (res: any) => res,
        (error: any) => error
      )
    );
  }
}
