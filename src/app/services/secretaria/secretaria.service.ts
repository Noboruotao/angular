import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SecretariaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/secretaria`;

  constructor(private httpClient: HttpClient) {}

  getMultas(pago: boolean, page: number, pageSize: number, search: string) {
    let params = new HttpParams()
      .set('pago', pago)
      .set('limit', pageSize)
      .set('page', page)
      .set('search', search);

    return this.httpClient
      .get(`${this.apiUrl}/getMultas`, { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
