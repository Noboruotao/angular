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
  alunos: MatTableDataSource<any>;
  @Input() ativExtra_id: number;
  error_message: string = '';

  displayedColumns: string[] = ['nome', 'action'];

  constructor(
    private ativExtraService: AtivExtraService,
    public authService: AuthService
  ) {
    this.alunos = new MatTableDataSource<any>([]);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ativExtra_id = changes['ativExtra_id'].currentValue;
    this.getAlunos(this.ativExtra_id);
  }

  getAlunos(id: number) {
    this.ativExtraService.getAlunos(id).subscribe({
      next: (data: any) => {
        this.alunos = new MatTableDataSource(data.data);
      },
      error: (error) => {
        // console.log(error.error.message);
        this.error_message = error.error.message;
      },
    });
  }
}
