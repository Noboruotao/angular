import { Component, Inject } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-emprestimo-detail',
  templateUrl: './emprestimo-detail.component.html',
  styleUrls: ['./emprestimo-detail.component.css'],
})
export class EmprestimoDetailComponent {
  emprestimo: any;
  showCard: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private bibliotecaService: BibliotecaService
  ) {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.bibliotecaService.getEmprestimoDetail(id).subscribe({
      next: (data) => {
        this.emprestimo = data.data;
        this.showCard = true;
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }

  devolver() {
    this.dialog.open(ConfirmDevolucaoDialog, {
      data: this.emprestimo,
    });
    // this.bibliotecaService.fazerDevolucao(this.emprestimo.id).subscribe({
    //   next: (data: any) => {
    // this.router.navigate(['biblioteca/emprestimo/list']);
    //   },
    //   error: (error) => {
    //     console.log(error.error.message);
    //   },
    // });
  }
}

@Component({
  selector: 'confirm-make-devolucao-modal',
  templateUrl: './confirmar-devolucao.html',
  standalone: true,
  imports: [
    CommonModule,
    // NgIf,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class ConfirmDevolucaoDialog {
  isDisabled = true;
  pagarMulta = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private bibliotecaService: BibliotecaService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public emprestimo: any
  ) {
    console.log(this.emprestimo);
    console.log(this.acervo);
    console.log(this.bibliotecario);
    console.log(this.leitor);
    console.log(this.multa);
  }

  get leitor() {
    return this.emprestimo.leitor;
  }
  get bibliotecario() {
    return this.emprestimo.bibliotecario;
  }
  get acervo() {
    return this.emprestimo.acervo;
  }
  get multa() {
    return this.emprestimo.multa;
  }

  devolver() {
    this.bibliotecaService.fazerDevolucao(this.emprestimo.id).subscribe({
      next: (data: any) => {
        this.router.navigate(['biblioteca/emprestimo/list']);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
