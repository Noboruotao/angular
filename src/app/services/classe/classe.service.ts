import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClasseService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/classe`;

  constructor(private httpClient: HttpClient) {}

  getClasses(ativo: number, page: number, pageSize: number) {
    let params = new HttpParams()
      .set('ativo', ativo)
      .set('page', page)
      .set('pageSize', pageSize);

    return this.httpClient
      .get<any>(this.apiUrl + '/getClasses', {
        params: params,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAlunos(classe_id: number) {
    return this.httpClient
      .get<any>(`${this.apiUrl}/getAlunos/${classe_id}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getClasseDetail(id: number) {
    return this.httpClient
      .get<any>(`${this.apiUrl}/getClasseDetail/${id}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
