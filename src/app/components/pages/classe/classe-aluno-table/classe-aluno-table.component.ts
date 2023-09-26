import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';

import { ClasseService } from 'src/app/services/classe/classe.service';

@Component({
  selector: 'app-classe-aluno-table',
  templateUrl: './classe-aluno-table.component.html',
  styleUrls: ['./classe-aluno-table.component.css'],
})
export class ClasseAlunoTableComponent {
  alunos: MatTableDataSource<any>;
  displayedColumns: string[] = ['nome'];

  constructor(
    private classeService: ClasseService,
    private route: ActivatedRoute
  ) {
    const classe_id = Number(this.route.snapshot.paramMap.get('id'));
    this.classeService.getAlunos(classe_id).subscribe((data: any) => {
      this.alunos = new MatTableDataSource<any>(data.data);
    });
  }
}
