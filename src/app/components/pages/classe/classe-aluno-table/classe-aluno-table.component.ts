import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-classe-aluno-table',
  templateUrl: './classe-aluno-table.component.html',
  styleUrls: ['./classe-aluno-table.component.css'],
})
export class ClasseAlunoTableComponent {
  displayedColumns: string[] = ['nome', 'makeNota'];
  @Input() classe: any;
  @Input() classe_id: number;
  @Input() alunos: MatTableDataSource<any>;
  @Input() user_id: number;
}
