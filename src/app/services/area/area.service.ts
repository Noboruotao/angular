import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AreaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/area`;

  constructor(private httpClient: HttpClient) {}

  getAreas(nivel: number) {
    return this.httpClient.get(this.apiUrl + '/getAreas?nivel=' + nivel);
  }

  getEscolhas(escolhas: string[]) {
    return this.httpClient.post(`${this.apiUrl}/getEscolhas`, { escolhas });
  }
}
