import { Component, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

import { ClasseService } from 'src/app/services/classe/classe.service';

@Component({
  selector: 'app-classe-table',
  templateUrl: './classe-table.component.html',
  styleUrls: ['./classe-table.component.css'],
})
export class ClasseTableComponent {
  classes: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'ano'];

  pageSize = 5;
  totalItems = 0;
  currentPage = 0;
  sortColumn: string = 'ano';
  sortOrder: string = 'desc';

  checked: boolean = true;

  ativo = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private classeService: ClasseService) {
    this.getClasses();
  }

  getClasses() {
    this.classeService
      .getClasses(
        this.ativo,
        this.currentPage,
        this.pageSize,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe((data: any) => {
        this.classes = new MatTableDataSource(data.data);
        this.totalItems = data.count;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getClasses();
  }

  enableAtivo() {
    this.ativo = this.ativo == 1 ? 0 : 1;
    this.getClasses();
  }

  sortData(sort: Sort) {
    this.sortColumn = sort.active;
    this.sortOrder = sort.direction == 'desc' ? 'desc' : 'asc';
    this.getClasses();
  }

  onSlideChange() {
    this.ativo = this.checked ? 1 : 0;
    console.log(this.ativo);
    console.log(this.checked);
    this.getClasses();
  }
}
