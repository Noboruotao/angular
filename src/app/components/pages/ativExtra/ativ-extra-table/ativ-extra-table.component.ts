import { Component, ViewChild, Input } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

import { AuthService } from 'src/app/services/authService/auth.service';
import { AtivExtraService } from 'src/app/services/ativExtra/ativ-extra.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
@Component({
  selector: 'app-ativ-extra-table',
  templateUrl: './ativ-extra-table.component.html',
  styleUrls: ['./ativ-extra-table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class AtivExtraTableComponent {
  ativExtras: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'descricao', 'tipo'];

  searchTerm: string = '';

  pageSize = 5;
  totalItems = 0;
  currentPage = 0;
  tipo: string = '';
  showCardBody: boolean = true;
  showCard: boolean = false;

  sortColumn: string = 'nome';
  sortOrder: string = 'asc';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() tipos: any;

  constructor(
    protected authService: AuthService,
    private ativExtraService: AtivExtraService,
    private _snackBar: MatSnackBar
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
        this.sortOrder,
        this.tipo
      )
      .subscribe({
        next: (data) => {
          this.ativExtras = new MatTableDataSource(data.data);
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

  onSelectChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.tipo = target.value;
    this.currentPage = 0;
    this.getAtivExtras();
  }

  openSnackBar(message: string, action: string = 'Fechar') {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}
