import { Component, Inject } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { AuthService } from 'src/app/services/authService/auth.service';

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
    private bibliotecaService: BibliotecaService,
    public authService: AuthService
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
  }

  formatDate(inputDate: string): string {
    const dateParts = inputDate.split('-');
    if (dateParts.length === 3) {
      const year = dateParts[0];
      const month = dateParts[1];
      const day = dateParts[2];

      return `${day}/${month}/${year}`;
    }
    return inputDate;
  }
}

@Component({
  selector: 'confirm-make-devolucao-modal',
  templateUrl: './confirmar-devolucao.html',
})
export class ConfirmDevolucaoDialog {
  isDisabled = true;
  pagarMulta = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private bibliotecaService: BibliotecaService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public emprestimo: any
  ) {}

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
    console.log(this.pagarMulta);
    this.bibliotecaService.fazerDevolucao(this.emprestimo.id).subscribe({
      next: (data: any) => {
        if (this.pagarMulta) {
          this.router.navigate([`secretaria/multa/${this.multa.id}`]);
        } else {
          this.router.navigate(['biblioteca/emprestimo/list']);
        }
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
