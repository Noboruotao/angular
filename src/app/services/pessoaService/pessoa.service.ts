import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
}
