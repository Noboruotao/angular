import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

import { AuthService } from 'src/app/services/authService/auth.service';
import { AtivExtraService } from 'src/app/services/ativExtra/ativ-extra.service';

@Component({
  selector: 'app-ativ-extra-table',
  templateUrl: './ativ-extra-table.component.html',
  styleUrls: ['./ativ-extra-table.component.css'],
})
export class AtivExtraTableComponent {
  ativExtras: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'descricao', 'tipo'];

  searchTerm: string = '';

  pageSize = 5;
  totalItems = 0;
  currentPage = 0;

  sortColumn: string = 'nome';
  sortOrder: string = 'asc';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    protected authService: AuthService,
    private ativExtraService: AtivExtraService
  ) {
    this.ativExtras = new MatTableDataSource<any>([]);
    this.getAtivExtras();
  }

  getAtivExtras() {
    this.ativExtraService
      .getAtivExtras(
        this.searchTerm,
        this.pageSize,
        this.currentPage,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe((data: any) => {
        this.ativExtras = new MatTableDataSource(data.data);
        this.totalItems = data.count;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAtivExtras();
  }

  ngAfterViewInit() {
    this.ativExtras.paginator = this.paginator;
    this.ativExtras.sort = this.sort;
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getAtivExtras();
  }

  sortData(sort: Sort) {
    this.sortColumn = sort.active;
    this.sortOrder = sort.direction == 'desc' ? 'desc' : 'asc';
    this.getAtivExtras();
  }
}
