import { Component, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/services/authService/auth.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-ativ-extra-sugeridos-table',
  templateUrl: './ativ-extra-sugeridos-table.component.html',
  styleUrls: ['./ativ-extra-sugeridos-table.component.css'],
})
export class AtivExtraSugeridosTableComponent {
  sugeridos: MatTableDataSource<any>;
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
    private alunoService: AlunoService
  ) {
    this.sugeridos = new MatTableDataSource<any>([]);

    if (authService.checkRoles(['Aluno'])) {
      this.getSugeridos();
    }
  }

  getSugeridos() {
    this.alunoService
      .getAtivExtraSugeridos(
        this.searchTerm,
        this.pageSize,
        this.currentPage,
        this.sortColumn,
        this.sortOrder
      )
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

  sortData(sort: Sort) {
    this.sortColumn = sort.active;
    this.sortOrder = sort.direction == 'desc' ? 'desc' : 'asc';
    this.getSugeridos();
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getSugeridos();
  }
}
