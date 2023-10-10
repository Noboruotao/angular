import { Component, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PessoaService } from 'src/app/services/pessoa/pessoa.service';
import { SecretariaService } from 'src/app/services/secretaria/secretaria.service';

@Component({
  selector: 'app-multa-detail',
  templateUrl: './multa-detail.component.html',
  styleUrls: ['./multa-detail.component.css'],
})
export class MultaDetailComponent {
  multa: any;
  disable = false;
  pessoaFoto: any;
  showCard = false;

  constructor(
    private SecretariaService: SecretariaService,
    private pessoaService: PessoaService,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.SecretariaService.getMulta(id).subscribe({
      next: (data: any) => {
        this.multa = data.data;
        this.disable = this.multa.pago != null;
        this.getFoto(data.data.pessoa.id);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }

  getFoto(id: number) {
    this.pessoaService.getFotoPessoa(id).subscribe(
      (resFoto) => {
        this.pessoaFoto = this.domSanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(resFoto)
        );
        this.showCard = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  pagarMulta() {
    this.dialog.open(PagarMultaDialog, { data: this.multa });
  }
}

@Component({
  selector: 'pagar-multa-modal',
  templateUrl: './pagar-multa.html',
})
export class PagarMultaDialog {
  isDisabled = true;
  pago = false;

  pagamentoForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<any>,
    private secretariaService: SecretariaService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public multa: any
  ) {
    this.pagamentoForm = new FormGroup({
      valor: new FormControl(0, [
        Validators.required,
        this.valorValidator.bind(this),
      ]),
    });
  }

  valorValidator(control: AbstractControl): ValidationErrors | null {
    const valor = control.value;
    if (valor < this.multa.valor) {
      return { belowValor: true };
    }
    return null;
  }

  pagar() {
    if (this.pagamentoForm.invalid) {
      return;
    }

    this.secretariaService.pagerMulta(this.multa.id).subscribe({
      next: (data: any) => {
        this.pago = true;
        this.router.navigate(['secretaria/multa/list']);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
