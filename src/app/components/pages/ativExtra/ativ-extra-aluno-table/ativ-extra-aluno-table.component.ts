import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AtivExtraService } from 'src/app/services/ativExtra/ativ-extra.service';
import { AuthService } from 'src/app/services/authService/auth.service';
@Component({
  selector: 'app-ativ-extra-aluno-table',
  templateUrl: './ativ-extra-aluno-table.component.html',
  styleUrls: ['./ativ-extra-aluno-table.component.css'],
})
export class AtivExtraAlunoTableComponent implements OnChanges {
  alunos: any;
  @Input() ativExtra_id: number;

  displayedColumns: string[] = ['nome', 'action'];

  constructor(
    private ativExtraService: AtivExtraService,
    public authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.ativExtra_id = changes['ativExtra_id'].currentValue;
    this.getAlunos(this.ativExtra_id);
  }

  getAlunos(id: number) {
    this.ativExtraService.getAlunos(id).subscribe({
      next: (data: any) => {
        this.alunos = data.data;
        console.log(this.ativExtra_id);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
