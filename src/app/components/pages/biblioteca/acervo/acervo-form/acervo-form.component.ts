import { Component } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { Observable } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  FormControl,
  FormGroupDirective,
  FormGroup,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatInput } from '@angular/material/input';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

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

  constructor(private bibliotecaService: BibliotecaService) {
    this.getAutors();
    this.listCategorias();
    this.listEditora();
    this.listIdiomas();
    this.listAcervoTipo();
    this.listSituacao();
    this.listEstado();
  }

  acervoForm = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    subtitulo: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    idioma: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    situacao: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
    resumo: new FormControl('', [Validators.required]),
    tradutor: new FormControl('', [Validators.required]),
    IBNS: new FormControl(''),
    ano_publicacao: new FormControl('', [Validators.required]),
    autor: new FormControl('', [Validators.required]),
    editora: new FormControl('', [Validators.required]),
    edicao: new FormControl('', [Validators.required]),
    capa: new FormControl(''),
  });

  matcher = new MyErrorStateMatcher();

  fetchData<T>(
    serviceMethod: (
      page: number,
      pageSize: number,
      search: string
    ) => Observable<T>,
    assignData: (data: T) => void,
    search: string,
    limit: number = 20
  ) {
    serviceMethod(0, limit, search).subscribe({
      next: (data) => {
        assignData(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAutors() {
    this.fetchData(
      this.bibliotecaService.listAutors,
      (data: any) => {
        this.autors = data.data;
      },
      this.AutorSearch
    );
  }

  listCategorias() {
    this.fetchData(
      this.bibliotecaService.listCategorias,
      (data: any) => {
        this.categorias = data.data;
      },
      this.categoriaSearch,
      0
    );
  }

  listEditora() {
    this.fetchData(
      this.bibliotecaService.listEditora,
      (data: any) => {
        this.editoras = data.data;
      },
      this.editoraSearch
    );
  }

  listAcervoTipo() {
    this.fetchData(
      this.bibliotecaService.listAcervoTipo,
      (data: any) => {
        this.tipos = data.data;
      },
      this.tipoSearch,
      0
    );
  }

  listIdiomas() {
    this.fetchData(
      this.bibliotecaService.listIdiomas,
      (data: any) => {
        this.idiomas = data.data;
      },
      this.idiomaSearch,
      0
    );
  }

  listSituacao() {
    this.fetchData(
      this.bibliotecaService.listSituacao,
      (data: any) => {
        this.situacoes = data.data;
      },
      this.situacaoSearch,
      0
    );
  }

  listEstado() {
    this.fetchData(
      this.bibliotecaService.listEstado,
      (data: any) => {
        this.estados = data.data;
      },
      this.estadoSearch
    );
  }

  submit() {
    if (this.acervoForm.invalid) {
      const invalidControls = Object.keys(this.acervoForm.controls).filter(
        (controlName) => this.acervoForm.get(controlName)?.invalid
      );

      if (invalidControls.length > 0) {
        const invalidControlNames = invalidControls.join(', ');
        alert(`The following fields are invalid: ${invalidControlNames}`);
      }
      return;
    }
    const formData = new FormData();
    formData.append('titulo', this.acervoForm.get('titulo')?.value ?? '');
    formData.append('subtitulo', this.acervoForm.get('subtitulo')?.value ?? '');
    formData.append('categoria', this.acervoForm.get('categoria')?.value ?? '');
    formData.append('idioma', this.acervoForm.get('idioma')?.value ?? '');
    formData.append('tipo', this.acervoForm.get('tipo')?.value ?? '');
    formData.append('situacao', this.acervoForm.get('situacao')?.value ?? '');
    formData.append('estado', this.acervoForm.get('estado')?.value ?? '');
    formData.append('resumo', this.acervoForm.get('resumo')?.value ?? '');

    console.log(formData);
  }
}
