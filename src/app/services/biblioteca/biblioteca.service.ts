import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/biblioteca`;

  constructor(private httpClient: HttpClient) {}

  getAcervoslist(
    limit: number,
    page: number,
    order: string,
    column?: string,
    search?: string,
    id?: number
  ) {
    let params = new HttpParams()
      .set('id', id ? id.toString() : '')
      .set('search', search || '')
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('sortColumn', column || '')
      .set('sortOrder', order);

    return this.httpClient
      .get<any>(this.apiUrl + '/listAcervos', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getCapa(capa: string) {
    return this.httpClient.get<any>(`${this.apiUrl}/getCapa/${capa}`, {
      responseType: 'blob' as 'json',
    });
  }

  getAcervo(id: number) {
    return this.httpClient.get(`${this.apiUrl}/getAcervo/${id}`);
  }

}
