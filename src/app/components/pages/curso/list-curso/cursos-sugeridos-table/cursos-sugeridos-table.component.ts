import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/services/authService/auth.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { CursoService } from 'src/app/services/curso/curso.service';
@Component({
  selector: 'app-cursos-sugeridos-table',
  templateUrl: './cursos-sugeridos-table.component.html',
  styleUrls: ['./cursos-sugeridos-table.component.css'],
})
export class CursosSugeridosTableComponent {
  sugeridos: MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'descricao'];

  searchTerm: string = '';

  pageSize = 5;
  totalItems = 0;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    protected authService: AuthService,
    private alunoService: AlunoService
  ) {
    this.sugeridos = new MatTableDataSource<any>([]);

    this.getSugeridos();
  }

  getSugeridos() {
    this.alunoService
      .getCursosSugeridos(this.searchTerm, this.pageSize, this.currentPage)
      .subscribe((data: any) => {
        this.sugeridos = new MatTableDataSource(data.data);
        this.totalItems = data.count;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getSugeridos();
  }

  ngAfterViewInit() {
    this.sugeridos.paginator = this.paginator;
    this.sugeridos.sort = this.sort;
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getSugeridos();
  }
}
