import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { __param } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/pessoa`;

  public pessoaFoto: any;

  constructor(private httpClient: HttpClient) {}

  getFotoPessoa(id: number) {
    return this.httpClient.get<any>(`${this.apiUrl}/foto/${id}`, {
      responseType: 'blob' as 'json',
    });
  }

  getPessoa(id: number) {
    return this.httpClient.get<JSON>(`${this.apiUrl}/getPessoa/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getPessoasWithCpf(search: string) {
    let params = new HttpParams().set('search', search || '');

    return this.httpClient
      .get<any>(this.apiUrl + '/getPessoaListWithCpf', {
        params: params,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
