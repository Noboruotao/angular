import { Component, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/services/authService/auth.service';
import { CursoService } from 'src/app/services/curso/curso.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html',
  styleUrls: ['./cursos-table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class CursosTableComponent {
  cursos: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'descricao'];

  searchTerm: string = '';

  maxDefinicaoLength = 100;

  pageSize = 5;
  totalItems = 0;
  currentPage = 0;

  showCardBody: boolean = true;
  showCard: boolean = false;

  sortColumn: string = 'nome';
  sortOrder: string = 'asc';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    protected authService: AuthService,
    private cursoService: CursoService,
    private _snackBar: MatSnackBar
  ) {
    this.cursos = new MatTableDataSource<any>([]);
    this.getCursos();
  }

  getCursos() {
    this.cursoService
      .getCursos(
        this.searchTerm,
        this.pageSize,
        this.currentPage,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe({
        next: (data) => {
          this.cursos = new MatTableDataSource(data.data);
          this.totalItems = data.count;
          this.showCard = true;
        },
        error: (error) => {
          this.openSnackBar(error.error.message);
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getCursos();
  }

  // ngAfterViewInit() {
  //   this.cursos.paginator = this.paginator;
  //   this.cursos.sort = this.sort;
  // }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getCursos();
  }

  sortData(sort: Sort) {
    this.sortColumn = sort.active;
    this.sortOrder = sort.direction == 'desc' ? 'desc' : 'asc';
    this.getCursos();
  }

  openSnackBar(message: string, action: string = 'Fechar') {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}
