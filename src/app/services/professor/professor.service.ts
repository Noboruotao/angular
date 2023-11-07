import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/professor`;

  constructor(private httpClient: HttpClient) {}

  getTiposAvaliacao(
    aluno_id: number | string = '',
    classe_id: number | string = ''
  ) {
    const params = new HttpParams()
      .set('aluno_id', aluno_id)
      .set('classe_id', classe_id);
    return this.httpClient
      .get<any>(`${this.apiUrl}/getTipoAvaliacao`, { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  attributeNota(formData: FormData) {
    return this.httpClient.post(this.apiUrl + '/attributeNota', formData);
  }

  attributeNotaFinal(formData: FormData) {
    return this.httpClient.post<any>(this.apiUrl + '/makeNotaFinal', formData);
  }
}
