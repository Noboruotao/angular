import { Component } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-acervo-form',
  templateUrl: './acervo-form.component.html',
  styleUrls: ['./acervo-form.component.css'],
})
export class AcervoFormComponent {
  autors: any;
  AutorSearch: string;

  categorias: any;
  categoriaSearch: string;

  editoras: any;
  editoraSearch: string;

  idiomas: any;
  idiomaSearch: string;

  tipos: any;
  tipoSearch: string;

  situacoes: any;
  situacaoSearch: string;

  estados: any;
  estadoSearch: string;

  currentPage: number = 0;
  pageSize: number = 10;
  constructor(private bibliotecaService: BibliotecaService) {
    this.getAutors();
    this.listCategorias();
    this.listEditora();
    this.listIdiomas();
    this.listAcervoTipo();
    this.listSituacao();
    this.listEstado();
  }

  getAutors() {
    this.bibliotecaService.listAutors(0, 20, this.AutorSearch).subscribe({
      next: (data: any) => {
        this.autors = data.data;
        console.log(this.autors);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  listCategorias() {
    this.bibliotecaService
      .listCategorias(0, 20, this.categoriaSearch)
      .subscribe({
        next: (data: any) => {
          this.categorias = data.data;
          console.log(this.categorias);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  listEditora() {
    this.bibliotecaService.listEditora(0, 20, this.editoraSearch).subscribe({
      next: (data: any) => {
        this.editoras = data.data;
        console.log(this.editoras);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  listIdiomas() {
    this.bibliotecaService.listIdiomas(0, 0, this.idiomaSearch).subscribe({
      next: (data: any) => {
        this.idiomas = data.data;
        console.log(this.idiomas);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  listAcervoTipo() {
    this.bibliotecaService.listAcervoTipo(0, 0, this.tipoSearch).subscribe({
      next: (data: any) => {
        this.tipos = data.data;
        console.log(this.tipos);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  listSituacao() {
    this.bibliotecaService.listSituacao(0, 0, this.situacaoSearch).subscribe({
      next: (data: any) => {
        this.situacoes = data.data;
        console.log(this.situacoes);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  listEstado() {
    this.bibliotecaService.listEstado(0, 0, this.situacaoSearch).subscribe({
      next: (data: any) => {
        this.estados = data.data;
        console.log(this.estados);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
