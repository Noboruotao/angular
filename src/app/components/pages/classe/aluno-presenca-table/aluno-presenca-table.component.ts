import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-aluno-presenca-table',
  templateUrl: './aluno-presenca-table.component.html',
  styleUrls: ['./aluno-presenca-table.component.css'],
})
export class AlunoPresencaTableComponent {
  displayedColumns: string[] = ['nome', 'presenca', 'falta', 'presencaPorCent'];
  @Input() classe: any;
  @Input() classe_id: number;
  @Input() alunos: MatTableDataSource<any>;

  showData() {
    console.log(this.alunos.data);
  }
}
