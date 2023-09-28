import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ClasseService } from 'src/app/services/classe/classe.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PessoaService } from 'src/app/services/pessoaService/pessoa.service';
import { ActivatedRoute } from '@angular/router';
import { ProfessorService } from 'src/app/services/professor/professor.service';

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
    private location: Location
  ) {
    this.route.queryParams.subscribe((params) => {
      this.aluno_id = +params['aluno_id'];
      this.classe_id = +params['classe_id'];
    });

    this.notaForm = new FormGroup({
      nota: new FormControl('', [Validators.required]),
      tipo_avaliacao_id: new FormControl('', [Validators.required]),
      aluno_id: new FormControl('', [Validators.required]),
      classe_id: new FormControl('', [Validators.required]),
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
    this.professorService.getTiposAvaliacao().subscribe((data: any) => {
      this.tiposAvaliacao = data;
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
    const formData = new FormData();
    formData.append('nota', this.nota);
    formData.append(
      'tipo_avaliacao_id',
      this.notaForm.get('tipo_avaliacao_id')!.value
    );
    formData.append('aluno_id', this.aluno.id);
    formData.append('classe_id', this.classe.id);

    this.professorService.attributeNota(formData).subscribe({
      next: (response) => {
        this.location.back();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
