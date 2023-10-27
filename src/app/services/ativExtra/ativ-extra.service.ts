import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AtivExtraService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/ativExtra`;

  constructor(private httpClient: HttpClient) {}

  getAtivExtras(
    search: string,
    limit: number,
    page: number,
    sortColumn: string = 'nome',
    order: string = 'asc',
    tipo: string = ''
  ) {
    let params = new HttpParams()
      .set('search', search || '')
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('sortColumn', sortColumn.toString())
      .set('order', order.toString())
      .set('tipo', tipo.toString());

    return this.httpClient
      .get<any>(this.apiUrl + '/getAtivExtras', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAtivExtraDetail(id: number) {
    return this.httpClient
      .get<any>(this.apiUrl + '/getAtivExtraDetail/' + id)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getAtivExtraTipo() {
    return this.httpClient.get<any>(this.apiUrl + '/getAtivExtraTipo').pipe(
      map((response) => {
        return response.data;
      })
    );
  }

  getAlunos(id: number) {
    let params = new HttpParams().set('id', id);
    return this.httpClient.get(this.apiUrl + '/getAlunos', { params: params });
  }
}
