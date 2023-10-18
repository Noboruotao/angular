import { Component, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/services/authService/auth.service';
import { DisciplinaService } from 'src/app/services/disciplina/disciplina.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-disciplina-table',
  templateUrl: './disciplina-table.component.html',
  styleUrls: ['./disciplina-table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class DisciplinaTableComponent {
  disciplinaList: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'periodo.periodo', 'carga_horaria'];

  searchTerm: string = '';

  pageSize = 10;
  totalItems = 0;
  currentPage = 0;
  showCard: boolean = false;
  showCardBody: boolean = false;

  sortColumn: string = '';
  sortOrder: string = 'desc';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private disciplinaService: DisciplinaService,
    private _snackBar: MatSnackBar
  ) {
    this.disciplinaList = new MatTableDataSource<any>([]);
    this.getDisciplinas();
  }

  getDisciplinas() {
    this.disciplinaService
      .getDisciplinas(
        this.searchTerm,
        this.currentPage,
        this.pageSize,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe({
        next: (data: any) => {
          this.disciplinaList = new MatTableDataSource<any>(data.data);
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
    this.getDisciplinas();
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getDisciplinas();
  }

  sortData(sort: Sort) {
    this.sortColumn = sort.active;
    this.sortOrder = sort.direction == 'desc' ? 'desc' : 'asc';
    this.getDisciplinas();
  }

  openSnackBar(message: string, action: string = 'Fechar') {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}
