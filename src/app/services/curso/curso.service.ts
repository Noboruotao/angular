import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CursoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/curso`;

  constructor(private httpClient: HttpClient) {}

  getCursos(search: string, limit: number, page: number) {
    let params = new HttpParams()
      .set('search', search || '')
      .set('limit', limit.toString())
      .set('page', page.toString());

    return this.httpClient
      .get<any>(this.apiUrl + '/getCursos', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getCurso(id: number) {
    return this.httpClient.get(`${this.apiUrl}/getCurso/${id}`);
  }
}
