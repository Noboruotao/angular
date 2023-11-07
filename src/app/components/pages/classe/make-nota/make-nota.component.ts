import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ClasseService } from 'src/app/services/classe/classe.service';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PessoaService } from 'src/app/services/pessoa/pessoa.service';
import { ActivatedRoute } from '@angular/router';
import { ProfessorService } from 'src/app/services/professor/professor.service';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-make-nota',
  templateUrl: './make-nota.component.html',
  styleUrls: ['./make-nota.component.css'],
})
export class MakeNotaComponent {
  aluno_id: number;
  classe_id: number;

  classe: any;
  aluno: any;

  tiposAvaliacao: any;

  nota: any;

  notaForm: FormGroup;

  constructor(
    private pessoaService: PessoaService,
    private classeService: ClasseService,
    private professorService: ProfessorService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.route.queryParams.subscribe((params) => {
      this.aluno_id = +params['aluno_id'];
      this.classe_id = +params['classe_id'];
    });

    this.notaForm = this.formBuilder.group({
      nota: ['', Validators.required],
      tipo_avaliacao_id: ['', Validators.required],
      aluno_id: [''],
      classe_id: [''],
    });

    this.getClasse();
    this.getPessoa();
    this.getTipoAvaliacao();
  }

  getClasse() {
    this.classeService
      .getClasseDetail(this.classe_id)
      .subscribe((data: any) => {
        this.classe = data.data;
      });
  }

  getPessoa() {
    this.pessoaService.getPessoa(this.aluno_id).subscribe((data: any) => {
      this.aluno = data.data;
    });
  }

  getTipoAvaliacao() {
    this.professorService
      .getTiposAvaliacao(this.aluno_id, this.classe_id)
      .subscribe((data: any) => {
        this.tiposAvaliacao = data.data;
      });
  }

  restrictInputToNumbers(event: any) {
    const input = event.target as HTMLInputElement;
    var inputValue = input.value.replace(/[^0-9.]/g, '');

    if (inputValue.length > 1) {
      if (inputValue[0] == '1' && inputValue[1] == '0') {
        inputValue = '10';
      } else if (inputValue.includes('.')) {
        const parts = inputValue.split('.');
        let integerPart = parts[0];
        let decimalPart = parts[1];
        inputValue = integerPart + '.' + decimalPart;
      } else {
        let integerPart = inputValue.slice(0, 1);
        let decimalPart = inputValue.slice(1);
        inputValue = integerPart + '.' + decimalPart;
      }
    }
    input.value = inputValue;
    this.nota = inputValue;
  }

  salvarNota() {
    if (this.notaForm.invalid) {
      return;
    }
    const formData = new FormData();
    formData.append('nota', this.nota);
    formData.append(
      'tipo_avaliacao_id',
      this.notaForm.get('tipo_avaliacao_id')!.value
    );
    formData.append('aluno_id', this.aluno.id);
    formData.append('classe_id', this.classe.id);

    this.dialog.open(ConfirmNotaDialog, {
      data: {
        formData: formData,
        alunoNome: this.aluno.nome,
        disciplina: this.classe.disciplina.nome,
        tipoAvaliacao: this.tiposAvaliacao.find(
          (item: any) =>
            item.id === this.notaForm.get('tipo_avaliacao_id')!.value
        ).nome,
      },
    });
  }
}

@Component({
  selector: 'confirm-make-nota-modal',
  templateUrl: './confirm-nota-modal.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCheckboxModule],
})
export class ConfirmNotaDialog {
  isDisabled = true;

  constructor(
    private professorService: ProfessorService,
    private location: Location,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get nota() {
    return this.data.formData.get('nota');
  }
  get alunoNome() {
    return this.data.alunoNome;
  }
  get tipoAvaliacaoId() {
    return this.data.formData.get('tipo_avaliacao_id');
  }
  get tipoAvaliacao() {
    return this.data.tipoAvaliacao;
  }
  get disciplina() {
    return this.data.disciplina;
  }

  salvarNota() {
    this.professorService.attributeNota(this.data.formData).subscribe({
      next: (response) => {
        this.location.back();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
