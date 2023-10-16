import { Component, Input } from '@angular/core';
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
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

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
  @Input() AcervoData: any | null = null;

  autors: any;
  // AutorSearch: string;
  selectedAutor: number;

  categorias: any;
  categoriaSearch: string;

  editoras: any;
  // editoraSearch: string;
  selectedEditora: number;

  idiomas: any;
  idiomaSearch: string;

  tipos: any;
  tipoSearch: string;

  situacoes: any;
  situacaoSearch: string;

  estados: any;
  estadoSearch: string;

  filteredAutorOptions: Observable<any>;
  AutorSearch = new FormControl();

  filteredEditoraOptions: Observable<any>;
  editoraSearch = new FormControl();

  firstForm = this._formBuilder.group({
    titulo: new FormControl(this.AcervoData ? this.AcervoData.titulo : '', [
      Validators.required,
    ]),
    subtitulo: new FormControl(
      this.AcervoData ? this.AcervoData.subtitulo : '',
      [Validators.required]
    ),
  });

  secondForm = this._formBuilder.group({
    capa: new FormControl(''),
    resumo: new FormControl(this.AcervoData ? this.AcervoData.resumo : '', [
      Validators.required,
    ]),
  });

  thirdForm = this._formBuilder.group({
    autor: new FormControl('', [Validators.required]),
    tradutor: new FormControl(this.AcervoData ? this.AcervoData.titulo : ''),
    editora: new FormControl('', [Validators.required]),
  });

  fourthForm = this._formBuilder.group({
    categoria: new FormControl('', [Validators.required]),
    idioma: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
    situacao: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
  });

  fifthForm = this._formBuilder.group({
    ibns: new FormControl(''),
    ano_publicacao: new FormControl(''),
    edicao: new FormControl(''),
  });

  constructor(
    private bibliotecaService: BibliotecaService,
    private _formBuilder: FormBuilder
  ) {
    this.filteredEditoraOptions = this.editoraSearch.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.getEditoras(term))
    );

    this.filteredAutorOptions = this.AutorSearch.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.getAutors(term))
    );

    this.listCategorias();
    this.listIdiomas();
    this.listAcervoTipo();
    this.listSituacao();
    this.listEstado();

    this.thirdForm.setValidators(this.autorAndEditoraSelectedValidator());
  }

  autorAndEditoraSelectedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.selectedAutor && this.selectedEditora) {
        return null; // No error, validation passes
      } else {
        return { autorAndEditoraNotSelected: true };
      }
    };
  }

  searchAutor(e: Event) {
    const target = e.target as HTMLInputElement;
    this.AutorSearch.setValue(target.value);
  }

  searchEditora(e: Event) {
    const target = e.target as HTMLInputElement;
    this.editoraSearch.setValue(target.value);
  }

  onOptionSelected(event: any): void {
    // this.selectedOption = event.option.value;
    // this.getPessoa(this.selectedOption.id);
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

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
  }

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

  getAutors(searchTerm: string) {
    return this.bibliotecaService.listAutors(0, 20, searchTerm).pipe(
      debounceTime(300),
      switchMap((term) => this.bibliotecaService.listAutors(0, 20, searchTerm)),
      map((data: any) => data.data)
    );
  }

  getEditoras(searchTerm: string) {
    return this.bibliotecaService.listEditora(0, 20, searchTerm).pipe(
      debounceTime(300),
      switchMap((term) =>
        this.bibliotecaService.listEditora(0, 20, searchTerm)
      ),
      map((data: any) => data.data)
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

  getAutor(id: number) {
    this.bibliotecaService.getAutor(id).subscribe({
      next: (data: any) => {
        this.selectedAutor = data.data.id;
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  getEditora(id: number) {
    this.bibliotecaService.getEditora(id).subscribe({
      next: (data: any) => {
        this.selectedEditora = data.data.id;
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
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
