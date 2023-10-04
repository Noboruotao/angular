import { Component, ViewChild } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';

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
  selector: 'app-disciplina-related-table',
  templateUrl: './disciplina-related-table.component.html',
  styleUrls: ['./disciplina-related-table.component.css'],

  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', animate(300)),
    ]),
  ],
})
export class DisciplinaRelatedTableComponent {
  relatedDisciplinaList: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'periodo.periodo', 'carga_horaria'];

  searchTerm: string = '';

  pageSize = 10;
  totalItems = 0;
  currentPage = 0;
  situacao = 1;

  showCardBody: boolean = true;

  sortColumn: string = 'nome';
  sortOrder: string = 'asc';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  situacoes = new FormControl();
  situacoesList: any[] = [
    { id: 1, nome: 'Ativo' },
    { id: 0, nome: 'Desativo' },
  ];

  constructor(
    private disciplinaService: DisciplinaService,
    public authService: AuthService
  ) {
    this.relatedDisciplinaList = new MatTableDataSource<any>([]);

    if (this.authService.checkRoles(['Aluno'])) {
      this.disciplinaService.getDisciplinaSituacoes().subscribe((data: any) => {
        this.situacoesList = data.data;
        this.situacao = 5;
        this.getRelatedDisciplinas();
      });
    } else {
      this.getRelatedDisciplinas();
    }
  }

  getRelatedDisciplinas() {
    this.disciplinaService
      .getRelatedDisciplinas(
        this.searchTerm,
        this.currentPage,
        this.pageSize,
        this.situacao,
        this.sortColumn,
        this.sortOrder
      )
      .subscribe((data: any) => {
        this.relatedDisciplinaList = new MatTableDataSource<any>(data.data);
        this.totalItems = data.count;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getRelatedDisciplinas();
  }

  ngAfterViewInit() {
    this.relatedDisciplinaList.paginator = this.paginator;
    this.relatedDisciplinaList.sort = this.sort;
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getRelatedDisciplinas();
  }

  onSelectChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.situacao = Number(target.value);
    this.getRelatedDisciplinas();
  }

  sortData(sort: Sort) {
    this.sortColumn = sort.active;
    this.sortOrder = sort.direction == 'desc' ? 'desc' : 'asc';
    this.getRelatedDisciplinas();
  }
}
