import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-notas-table',
  templateUrl: './notas-table.component.html',
  styleUrls: ['./notas-table.component.css'],
})
export class NotasTableComponent {
  notas: MatTableDataSource<any>;
  nota_final: any;

  displayedColumns: string[] = ['tipo', 'nota'];

  constructor(
    private alunoService: AlunoService,
    public authService: AuthService,
    private route: ActivatedRoute
  ) {
    const disciplina_id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.authService.checkRoles(['Aluno'])) {
      this.alunoService
        .getDisciplinaNota(disciplina_id)
        .subscribe((data: any) => {
          this.notas = new MatTableDataSource(data.data);
          this.nota_final = data.nota_final;
        });
    }
  }
}
