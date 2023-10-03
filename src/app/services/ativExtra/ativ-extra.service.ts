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
    order: string = 'asc'
  ) {

    let params = new HttpParams()
      .set('search', search || '')
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('sortColumn', sortColumn.toString())
      .set('order', order.toString());

    return this.httpClient
      .get<any>(this.apiUrl + '/getAtivExtra', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
