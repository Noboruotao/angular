import { Component, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AuthService } from 'src/app/services/authService/auth.service';
import { AlunoService } from 'src/app/services/aluno/aluno.service';
import { Sort } from '@angular/material/sort';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-cursos-sugeridos-table',
  templateUrl: './cursos-sugeridos-table.component.html',
  styleUrls: ['./cursos-sugeridos-table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class CursosSugeridosTableComponent {
  sugeridos: MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'descricao'];

  searchTerm: string = '';
  showTable: boolean = false;
  showCardBody: boolean = true;

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
      .getCursosSugeridos(
        this.searchTerm,
        this.pageSize,
        this.currentPage,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe((data: any) => {
        this.sugeridos = new MatTableDataSource(data.data);
        this.totalItems = data.count;
        this.showTable =
          this.searchTerm == '' && this.totalItems == 0 ? false : true;
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
