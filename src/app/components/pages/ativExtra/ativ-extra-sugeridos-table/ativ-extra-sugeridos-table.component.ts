import { Component, ViewChild, Input } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

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
  selector: 'app-ativ-extra-sugeridos-table',
  templateUrl: './ativ-extra-sugeridos-table.component.html',
  styleUrls: ['./ativ-extra-sugeridos-table.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class AtivExtraSugeridosTableComponent {
  sugeridos: MatTableDataSource<any>;
  displayedColumns: string[] = ['nome', 'descricao', 'tipo', 'action'];

  showcard = false;
  showCardBody: boolean = true;
  searchTerm: string = '';

  pageSize = 5;
  totalItems = 0;
  currentPage = 0;
  sortColumn: string = 'nome';
  sortOrder: string = 'asc';
  tipo: string = '';
  no_sugeridos: boolean = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() tipos: any;

  constructor(
    protected authService: AuthService,
    private alunoService: AlunoService,
    private _snackBar: MatSnackBar
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
        this.sortOrder,
        this.tipo
      )
      .subscribe({
        next: (data) => {
          this.sugeridos = new MatTableDataSource(data.data);
          this.totalItems = data.count;
          if (this.totalItems > 0 && this.no_sugeridos == false) {
            this.no_sugeridos = true;
          }
          this.showcard = this.no_sugeridos ? true : false;
        },
        error: (error) => {
          // this.openSnackBar(error.error.message);
        },
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

  onSelectChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.tipo = target.value;
    this.currentPage = 0;
    this.getSugeridos();
  }

  openSnackBar(message: string, action: string = 'Fechar') {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  naoMostrarMaisSugeridos(model_id: Number, model_type: String) {
    this.alunoService.naoMostrarMaisSugeridos(model_id, model_type).subscribe({
      next: (data: any) => {
        this.getSugeridos();
      },
    });
  }
}
