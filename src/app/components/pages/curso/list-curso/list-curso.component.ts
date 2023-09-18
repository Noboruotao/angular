import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/services/authService/auth.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { CursoService } from 'src/app/services/curso/curso.service';


@Component({
  selector: 'app-list-curso',
  templateUrl: './list-curso.component.html',
  styleUrls: ['./list-curso.component.css'],
})
export class ListCursoComponent {
  sugeridos: MatTableDataSource<any>;
  cursos: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'descricao'];

  searchTerm: string = '';
  searchTermSugeridos: string = '';

  pageSize = 5;
  totalItems = 0;
  currentPage = 0;

  pageSizeSugeridos = 5;
  totalItemsSugeridos = 0;
  currentPageSugeridos = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginatorSugeridos: MatPaginator;
  @ViewChild(MatSort) sortSugeridos: MatSort;

  constructor(
    protected authService: AuthService,
    private alunoService: AlunoService,
    private cursoService: CursoService
  ) {
    this.cursos = new MatTableDataSource<any>([]);
    this.sugeridos = new MatTableDataSource<any>([]);

    this.getCursos();

    this.getSugeridos();
  }

  getCursos() {
    this.cursoService
      .getCursos(this.searchTerm, this.pageSize, this.currentPage)
      .subscribe((data: any) => {
        this.cursos = new MatTableDataSource(data.data);
        this.totalItems = data.count;
      });
  }

  getSugeridos() {
    this.alunoService
      .getCursosSugeridos(
        this.searchTermSugeridos,
        this.pageSizeSugeridos,
        this.currentPageSugeridos
      )
      .subscribe((data: any) => {
        this.sugeridos = new MatTableDataSource(data.data);
        this.totalItemsSugeridos = data.count;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCursos();
  }

  onPageChangeSugeridos(event: PageEvent) {
    this.currentPageSugeridos = event.pageIndex;
    this.pageSizeSugeridos = event.pageSize;
    this.getSugeridos();
  }

  ngAfterViewInit() {
    this.cursos.paginator = this.paginator;
    this.cursos.sort = this.sort;
    this.sugeridos.paginator = this.paginatorSugeridos;
    this.sugeridos.sort = this.sortSugeridos;
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getCursos();
  }

  searchSugeridos(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTermSugeridos = target.value;
    this.currentPageSugeridos = 0;
    this.getSugeridos();
  }
}
