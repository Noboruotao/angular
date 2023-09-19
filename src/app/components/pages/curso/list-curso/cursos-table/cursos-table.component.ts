import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/services/authService/auth.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { CursoService } from 'src/app/services/curso/curso.service';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html',
  styleUrls: ['./cursos-table.component.css'],
})
export class CursosTableComponent {
  cursos: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'descricao'];

  searchTerm: string = '';

  pageSize = 5;
  totalItems = 0;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    protected authService: AuthService,
    private cursoService: CursoService
  ) {
    this.cursos = new MatTableDataSource<any>([]);

    this.getCursos();
  }

  getCursos() {
    this.cursoService
      .getCursos(this.searchTerm, this.pageSize, this.currentPage)
      .subscribe((data: any) => {
        this.cursos = new MatTableDataSource(data.data);
        this.totalItems = data.count;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCursos();
  }

  ngAfterViewInit() {
    this.cursos.paginator = this.paginator;
    this.cursos.sort = this.sort;
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getCursos();
  }
}
