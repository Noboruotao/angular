import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BibliotecaService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}api/biblioteca`;

  constructor(private httpClient: HttpClient) {}

  getAcervoslist(
    limit: number,
    page: number,
    order: string,
    column?: string,
    search?: string,
    id?: number
  ) {
    let params = new HttpParams()
      .set('id', id ? id.toString() : '')
      .set('search', search || '')
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('sortColumn', column || '')
      .set('sortOrder', order);

    return this.httpClient
      .get<any>(this.apiUrl + '/listAcervos', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getCapa(capa: string) {
    return this.httpClient.get<any>(`${this.apiUrl}/getCapa/${capa}`, {
      responseType: 'blob' as 'json',
    });
  }

  getAcervo(id: number) {
    return this.httpClient.get(`${this.apiUrl}/getAcervo/${id}`);
  }

  getEmprestimos(
    pendente: boolean,
    limit: number,
    page: number,
    search: string
  ) {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('page', page.toString())
      .set('search', search.toString())
      .set('pendente', pendente);

    return this.httpClient
      .get<any>(this.apiUrl + '/listEmprestimos', {
        params: params,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getEmprestimoDetail(id: number) {
    return this.httpClient.get<any>(this.apiUrl + '/getEmprestimoDetail/' + id);
  }

  makeEmprestimo(acervo_id: number, leitor_id: number) {
    const request_body = {
      acervo_id: acervo_id,
      leitor_id: leitor_id,
    };

    return this.httpClient.post(
      this.apiUrl + '/createEmprestimo',
      request_body
    );
  }

  fazerDevolucao(id: number) {
    const request_body = {
      emprestimo_id: id,
    };

    return this.httpClient.post(this.apiUrl + '/makeDevolucao', request_body);
  }

  listAutors(page: number, pageSize: number, search: string) {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('page', page.toString())
      .set('search', search || '');

    return this.httpClient
      .get(this.apiUrl + '/listAutors', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  listCategorias(page: number, pageSize: number, search: string) {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('offset', page.toString())
      .set('search', search || '');

    return this.httpClient
      .get(this.apiUrl + '/listCategorias', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  listEditora(page: number, pageSize: number, search: string) {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('page', page.toString())
      .set('search', search || '');

    return this.httpClient
      .get(this.apiUrl + '/listEditora', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  listIdiomas(page: number, pageSize: number, search: string) {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('page', page.toString())
      .set('search', search || '');

    return this.httpClient
      .get(this.apiUrl + '/listIdiomas', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  
    }


  listAcervoTipo(page: number, pageSize: number, search: string) {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('page', page.toString())
      .set('search', search || '');

    return this.httpClient
      .get(this.apiUrl + '/listAcervoTipo', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  listSituacao(page: number, pageSize: number, search: string) {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('page', page.toString())
      .set('search', search || '');

    return this.httpClient
      .get(this.apiUrl + '/listSituacao', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  
    }
    listEstado(page: number, pageSize: number, search: string) {
    const params = new HttpParams()
      .set('limit', pageSize.toString())
      .set('page', page.toString())
      .set('search', search || '');

    return this.httpClient
      .get(this.apiUrl + '/listEstado', { params: params })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
