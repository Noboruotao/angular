import { Component } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { ActivatedRoute } from '@angular/router';

import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-make-nota-final-table',
  templateUrl: './make-nota-final-table.component.html',
  styleUrls: ['./make-nota-final-table.component.css'],
})
export class MakeNotaFinalTableComponent {
  notas: MatTableDataSource<any>;
  nota_final: any | null = null;

  displayedColumns: string[] = ['tipo', 'ativo', 'peso', 'nota'];

  aluno_id: number;
  classe_id: number;

  constructor(
    private alunoService: AlunoService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params) => {
      this.aluno_id = +params['aluno_id'];
      this.classe_id = +params['classe_id'];
    });

    this.getNotas();
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
    const activeNotas = this.notas.data.filter(item => item.ativo);
  
  if (activeNotas.length === 0) {
    this.nota_final = 0; // Handle the case when there are no active items.
    return;
  }

  const totalPeso = activeNotas.reduce((sum, item) => sum + item.peso, 0);
  const weightedSum = activeNotas.reduce((sum, item) => sum + item.nota * item.peso, 0);

  this.nota_final = weightedSum / totalPeso;
  }
}
