import { Component, Input } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { Observable } from 'rxjs';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-acervo-form',
  templateUrl: './acervo-form.component.html',
  styleUrls: ['./acervo-form.component.css'],
})
export class AcervoFormComponent {
  @Input() AcervoData: any | null = null;
  autors: any;
  selectedAutor: number;
  categorias: any;
  categoriaSearch: string;
  editoras: any;
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
  acervoFormData = new FormData();

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
    private _formBuilder: FormBuilder,
    private router: Router
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

    this.getAcervoParametros();
  }

  searchAutor(e: Event) {
    const target = e.target as HTMLInputElement;
    this.AutorSearch.setValue(target.value);
  }

  searchEditora(e: Event) {
    const target = e.target as HTMLInputElement;
    this.editoraSearch.setValue(target.value);
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const maxSize = 64 * 64; // 1MB (adjust as needed)

      if (file.size > maxSize) {
        this.secondForm.get('capa')?.setErrors({ fileSize: true });
      } else {
        this.secondForm.get('capa')?.setErrors(null);
      }
      if (this.acervoFormData.has('capa')) {
        this.acervoFormData.delete('capa');
      }
      this.acervoFormData.append('capa', file);
    }
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

  getAcervoParametros() {
    this.bibliotecaService.getAcervoParametros().subscribe({
      next: (data: any) => {
        this.categorias = data.categorias;
        this.idiomas = data.idiomas;
        this.estados = data.estados;
        this.tipos = data.tipos;
        this.situacoes = data.situacoes;
      },
    });
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
    this.acervoFormData.append(
      'titulo',
      this.firstForm.get('titulo')?.value ?? ''
    );
    this.acervoFormData.append(
      'subtitulo',
      this.firstForm.get('subtitulo')?.value ?? ''
    );

    this.acervoFormData.append(
      'resumo',
      this.secondForm.get('resumo')?.value ?? ''
    );

    this.acervoFormData.append(
      'autor_id',
      this.selectedAutor ? String(this.selectedAutor) : ''
    );
    this.acervoFormData.append(
      'tradutor',
      this.thirdForm.get('tradutor')?.value ?? ''
    );
    this.acervoFormData.append(
      'editora_id',
      this.selectedEditora ? String(this.selectedEditora) : ''
    );

    this.acervoFormData.append(
      'categoria_id',
      this.fourthForm.get('categoria')?.value ?? ''
    );
    this.acervoFormData.append(
      'idioma_id',
      this.fourthForm.get('idioma')?.value ?? ''
    );
    this.acervoFormData.append(
      'tipo_id',
      this.fourthForm.get('tipo')?.value ?? ''
    );
    this.acervoFormData.append(
      'situacao_id',
      this.fourthForm.get('situacao')?.value ?? ''
    );
    this.acervoFormData.append(
      'estado_id',
      this.fourthForm.get('estado')?.value ?? ''
    );

    this.acervoFormData.append(
      'ano_publicacao',
      this.fifthForm.get('ano_publicacao')?.value ?? ''
    );
    this.acervoFormData.append(
      'edicao',
      this.fifthForm.get('edicao')?.value ?? ''
    );
    this.acervoFormData.append('IBNS', this.fifthForm.get('ibns')?.value ?? '');

    console.log(this.acervoFormData);

    this.bibliotecaService.createAcervo(this.acervoFormData).subscribe({
      next: (data: any) => {
        this.router.navigate([`/biblioteca/acervo/${data.data.id}`]);
      },
      error: (error) => {
        alert(error.error.message);
      },
    });
  }
}
