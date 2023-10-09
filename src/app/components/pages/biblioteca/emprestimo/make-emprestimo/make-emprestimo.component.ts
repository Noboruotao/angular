import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PessoaService } from 'src/app/services/pessoa/pessoa.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';

@Component({
  selector: 'app-make-emprestimo',
  templateUrl: './make-emprestimo.component.html',
  styleUrls: ['./make-emprestimo.component.css'],
})
export class MakeEmprestimoComponent {
  acervo: any;
  pessoas: Observable<any>;
  filteredOptions: Observable<any>;
  bibliotecaUrl: string;
  faSearch = faSearch;
  searchTerm: string = '';
  searchControl = new FormControl();
  selectedOption: any;
  pessoa: any;
  pessoaFoto: any;

  constructor(
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    private bibliotecaService: BibliotecaService,
    private pessoaService: PessoaService
  ) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.getPessoas(term))
    );

    this.getAcervo();
  }

  getAcervo() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bibliotecaUrl = environment.baseApiUrl + 'api/biblioteca';
    this.bibliotecaService.getAcervo(id).subscribe({
      next: (data: any) => {
        this.acervo = data.data;
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  getPessoas(term: string): Observable<any[]> {
    return this.pessoaService
      .getPessoasWithCpf(term)
      .pipe(map((data) => data.data));
  }

  getFoto(id: number) {
    this.pessoaService.getFotoPessoa(id).subscribe(
      (resFoto) => {
        this.pessoaFoto = this.domSanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(resFoto)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  displayFn() {
    let innerHtml = this.pessoa
      ? `${this.pessoa.nome} - ${this.pessoa.cpf}`
      : '';
    return innerHtml;
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchControl.setValue(this.searchTerm);
  }

  getPessoa(id: number) {
    this.pessoaService.getPessoa(id).subscribe({
      next: (data: any) => {
        this.pessoa = data.data;
        this.getFoto(this.pessoa.id);
        console.log(this.pessoa);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  onOptionSelected(event: any): void {
    this.selectedOption = event.option.value;
    this.getPessoa(this.selectedOption);
  }

  fazerEmprestimo() {
    this.dialog.open(ConfirmEmprestimoDialog, {
      data: {
        leitor: this.pessoa,
        acervo: this.acervo,
      },
    });
  }
}
@Component({
  selector: 'confirm-make-emprestimo-modal',
  templateUrl: './confirmar-emprestimo.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCheckboxModule],
})
export class ConfirmEmprestimoDialog {
  isDisabled = true;
  hoje: Date = new Date();

  date14DaysLater: Date = new Date(this.hoje);

  constructor(
    public dialogRef: MatDialogRef<any>,
    private bibliotecaService: BibliotecaService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.date14DaysLater.setDate(this.hoje.getDate() + 14);
  }

  get acervo() {
    return this.data.acervo;
  }

  get leitor() {
    return this.data.leitor;
  }

  formatDate(data: Date): string {
    const day = data.getDate();
    const month = data.getMonth() + 1;
    const year = data.getFullYear();
    return `${day}/${month}/${year}`;
  }

  fazerEmprestimo() {
    this.bibliotecaService
      .makeEmprestimo(this.acervo.id, this.leitor.id)
      .subscribe({
        next: (data: any) => {
          console.log(data.data);
          this.router.navigate(['biblioteca/emprestimo/', data.data.id]);
        },
        error: (error) => {
          console.log(error.error.message);
        },
      });
  }
}
