import { Component, Input } from '@angular/core';
import { ClasseService } from 'src/app/services/classe/classe.service';
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

  constructor(
    private pessoaService: PessoaService,
    private classeService: ClasseService,
    private professorService: ProfessorService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.aluno_id = +params['aluno_id'];
      this.classe_id = +params['classe_id'];
    });

    this.classeService
      .getClasseDetail(this.classe_id)
      .subscribe((data: any) => {
        this.classe = data.data;
      });

    this.pessoaService.getPessoa(this.aluno_id).subscribe((data: any) => {
      this.aluno = data.data;
    });

    this.professorService.getTiposAvaliacao().subscribe((data: any) => {
      this.tiposAvaliacao = data;
    });
  }

  restrictInputToNumbers(event: any) {
    const input = event.target as HTMLInputElement;
    let inputValue = input.value.replace(/[^0-9]/g, '');

    if (
      inputValue.length > 1 
    ) {
      inputValue = inputValue.slice(0, 1) + '.' + inputValue.slice(1);
    }

    inputValue = inputValue;

    input.value = inputValue;
  }

  salvarNota() {
    console.log(this.nota);
  }
}
