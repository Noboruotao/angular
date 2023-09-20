import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/services/authService/auth.service';
import { DisciplinaService } from 'src/app/services/disciplina/disciplina.service';

@Component({
  selector: 'app-disciplina-table',
  templateUrl: './disciplina-table.component.html',
  styleUrls: ['./disciplina-table.component.css'],
})
export class DisciplinaTableComponent {
  disciplinaList: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'periodo', 'carga_horaria'];

  searchTerm: string = '';
  searchTermRelated: string = '';

  pageSize = 10;
  totalItems = 0;
  currentPage = 0;

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
      .getDisciplinas(this.searchTerm, this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.disciplinaList = data.data;
        this.totalItems = data.count;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getDisciplinas();
  }

  ngAfterViewInit() {
    this.disciplinaList.paginator = this.paginator;
    this.disciplinaList.sort = this.sort;
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getDisciplinas();
  }
}
