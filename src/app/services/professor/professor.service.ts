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

  getTiposAvaliacao() {
    return this.httpClient.get<any>(`${this.apiUrl}/getTipoAvaliacao`).pipe(
      map((response) => {
        return response;
      })
    );
  }

  attributeNota(formData: FormData) {
    return this.httpClient.post(this.apiUrl + '/attributeNota', formData);
  }
}
