import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  ativo = 1;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private classeService: ClasseService) {
    this.getClasses();
  }

  getClasses() {
    this.classeService
      .getClasses(this.ativo, this.currentPage, this.pageSize)
      .subscribe((data: any) => {
        this.classes = data.data;
        this.totalItems = data.count;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getClasses();
  }

  ngAfterViewInit() {
    this.classes.paginator = this.paginator;
    this.classes.sort = this.sort;

  }

  enableAtivo() {
    this.ativo = this.ativo == 1 ? 0 : 1;
    this.getClasses();
  }
}
