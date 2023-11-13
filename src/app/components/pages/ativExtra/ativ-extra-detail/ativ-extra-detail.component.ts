import { Component, Inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import {
  startWith,
  map,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';
import { AtivExtraService } from 'src/app/services/ativExtra/ativ-extra.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { PessoaService } from 'src/app/services/pessoa/pessoa.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DomSanitizer } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AtivExtraAlunoTableComponent } from '../ativ-extra-aluno-table/ativ-extra-aluno-table.component';

@Component({
  selector: 'app-ativ-extra-detail',
  templateUrl: './ativ-extra-detail.component.html',
  styleUrls: ['./ativ-extra-detail.component.css'],
})
export class AtivExtraDetailComponent {
  ativExtraInfo: any;
  showCard: boolean = false;

  @ViewChild(AtivExtraAlunoTableComponent)
  ativExtraAlunoTable: AtivExtraAlunoTableComponent;

  constructor(
    private ativExtraService: AtivExtraService,
    public authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ativExtraService.getAtivExtraDetail(id).subscribe({
      next: (data) => {
        this.ativExtraInfo = data.data;
        this.showCard = true;
      },
      error: () => {
        this.ativExtraInfo = {
          nome: 'ATIVIDADE EXTRACURRICULAR NÃO ENCONTRADO',
          descricao: 'O Atividade Extracurricular não foi encontrado',
        };
        this.showCard = true;
      },
    });
  }

  atribuirAlunoAtivExtra() {
    const dialogRef = this.dialog.open(AttributeAlunoAtivExtraDialog, {
      data: { ativExtra: this.ativExtraInfo },
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.ativExtraAlunoTable.getAlunos();
      }
    });
  }
}

@Component({
  selector: 'attribute-aluno_ativExtra-dialog',
  templateUrl: './attribute-aluno-to-ativExtra.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSnackBarModule,
    CommonModule,
  ],
})
export class AttributeAlunoAtivExtraDialog {
  isDisabled = true;

  searchTerm: string = '';
  filteredOptions: Observable<any>;
  searchControl = new FormControl();

  selectedOption: any;

  pessoas: Observable<any>;

  pessoa: any;
  pessoaFoto: any;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private router: Router,
    private pessoaService: PessoaService,
    private ativExtraService: AtivExtraService,
    private domSanitizer: DomSanitizer,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => this.getPessoas(term))
    );
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.searchControl.setValue(this.searchTerm);
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

  getPessoa(id: number) {
    this.pessoaService.getPessoa(id).subscribe({
      next: (data: any) => {
        this.pessoa = data.data;
        this.getFoto(this.pessoa.id);
      },
      error: (error) => {
        this.openSnackBar(error.error.message);
      },
    });
  }

  onOptionSelected(event: any): void {
    this.selectedOption = event.option.value;
  }

  attributeAlunoAtivExtra() {
    this.ativExtraService
      .attributeAlunoAtivExtra(this.pessoa.id, this.data.ativExtra.id)
      .subscribe({
        next: (data: any) => {
          this.openSnackBar('Aluno Atribuido com Sucesso.');
          this.closeDialog();
        },
        error: (error) => {
          this.openSnackBar(error.error.message);
          this.closeDialog(false);
        },
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Fechar', { duration: 2000 });
  }

  closeDialog(reload: boolean = true) {
    this.dialogRef.close(reload);
  }
}
