import { Component, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

import { AuthService } from 'src/app/services/authService/auth.service';
import { DisciplinaService } from 'src/app/services/disciplina/disciplina.service';

@Component({
  selector: 'app-disciplina-table',
  templateUrl: './disciplina-table.component.html',
  styleUrls: ['./disciplina-table.component.css'],
})
export class DisciplinaTableComponent {
  disciplinaList: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'periodo.periodo', 'carga_horaria'];

  searchTerm: string = '';

  pageSize = 10;
  totalItems = 0;
  currentPage = 0;

  sortColumn: string = '';
  sortOrder: string = 'desc';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private authService: AuthService,
    private disciplinaService: DisciplinaService
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
      .subscribe((data: any) => {
        this.disciplinaList = new MatTableDataSource<any>(data.data);
        this.totalItems = data.count;
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
}
