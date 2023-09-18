import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/aluno`;

  constructor(private httpClient: HttpClient) {}

  getCursosSugeridos(search: string, limit: number, page: number) {
    let params = new HttpParams()
      .set('search', search || '')
      .set('limit', limit.toString())
      .set('page', page.toString());

    return this.httpClient
      .get<any>(this.apiUrl + '/getCursosSugeridos', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
