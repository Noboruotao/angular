import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class PessoaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api`;

  public pessoaFoto: any;

  constructor(private httpClient: HttpClient) {}

  getFotoPessoa(id: number) {
    return this.httpClient.get<any>(`${this.apiUrl}/pessoa/foto/${id}`, {
      responseType: 'blob' as 'json',
    });
  }

  getPessoa(id: number) {
    return this.httpClient
      .get<JSON>(`${this.apiUrl}/pessoa/getPessoa/${id}`)
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
