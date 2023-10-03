import { Component, Inject } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { PessoaService } from 'src/app/services/pessoa/pessoa.service';
import { ProfessorService } from 'src/app/services/professor/professor.service';
import { Location } from '@angular/common';

import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-make-nota-final-table',
  templateUrl: './make-nota-final-table.component.html',
  styleUrls: ['./make-nota-final-table.component.css'],
})
export class MakeNotaFinalTableComponent {
  notas: MatTableDataSource<any>;
  nota_final: any | null = null;

  displayedColumns: string[] = ['tipo', 'ativo', 'peso', 'nota'];
  classe: any;
  aluno: any;
  aluno_id: number;
  classe_id: number;
  isDisabled = true;

  constructor(
    private pessoaService: PessoaService,
    private classeService: ClasseService,
    private alunoService: AlunoService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.route.queryParams.subscribe((params) => {
      this.aluno_id = +params['aluno_id'];
      this.classe_id = +params['classe_id'];
    });
    this.getClasse();
    this.getPessoa();
    this.getNotas();
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

  getNotas() {
    this.alunoService
      .getNota(this.classe_id, null, false, this.aluno_id)
      .subscribe((data: any) => {
        for (let nota of data.data) {
          nota.ativo = true;
          nota.peso = nota.tipo.id == 1 ? 4 : nota.tipo.id == 2 ? 6 : 1;
        }
        this.notas = new MatTableDataSource(data.data);
        this.calculateNotaFinal();
      });
  }

  calculateNotaFinal() {
    const activeNotas = this.notas.data.filter((item) => item.ativo);

    if (activeNotas.length === 0) {
      this.nota_final = 0;
      this.isDisabled = true;
      return;
    }

    const totalPeso = activeNotas.reduce((sum, item) => sum + item.peso, 0);
    const weightedSum = activeNotas.reduce(
      (sum, item) => sum + item.nota * item.peso,
      0
    );

    this.nota_final = weightedSum / totalPeso;
    this.isDisabled = false;
  }

  arredondarNota() {
    const rounded = Math.round(this.nota_final * 2) / 2;
    this.nota_final = rounded;
  }

  salvarNota() {
    this.dialog.open(ConfirmNotaFinalDialog, {
      data: {
        nota_final: this.nota_final,
        aluno: this.aluno.nome,
        aluno_id: this.aluno.id,
        classe_id: this.classe.id,
        disciplina: this.classe.disciplina.nome,
      },
    });
  }
}

@Component({
  selector: 'confirm-nota-final',
  templateUrl: './confirm-nota-final.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatCheckboxModule],
})
export class ConfirmNotaFinalDialog {
  isDisabled = true;

  constructor(
    private professorService: ProfessorService,
    private location: Location,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get notaFinal() {
    return this.data.nota_final;
  }
  get aluno() {
    return this.data.aluno;
  }
  get disciplina() {
    return this.data.disciplina;
  }
  get alunoId() {
    return this.data.aluno_id;
  }
  get classeId() {
    return this.data.classe_id;
  }

  salvarNotaFinal() {
    const formData = new FormData();
    formData.append('aluno_id', this.alunoId);
    formData.append('classe_id', this.classeId);
    formData.append('nota_final', this.notaFinal);

    this.professorService
      .attributeNotaFinal(formData)
      .subscribe((data: any) => {
        this.location.back();
      });
  }
}
