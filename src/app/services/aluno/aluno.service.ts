import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthService } from '../authService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/aluno`;

  user: any;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    this.user = this.authService.userData;
  }

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

  getNota(classe_id: any, disciplina_id: any, todos: boolean = false) {
    let params = new HttpParams()
      .set('todas_notas', todos)
      .set('disciplina_id', disciplina_id)
      .set('classe_id', classe_id);
    return this.httpClient
      .get<any>(this.apiUrl + '/getNotas/' + this.user.id, {
        params: params,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
