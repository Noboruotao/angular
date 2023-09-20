import { Component, ViewChild, AfterViewInit } from '@angular/core';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from 'src/app/services/authService/auth.service';
import { DisciplinaService } from 'src/app/services/disciplina/disciplina.service';

@Component({
  selector: 'app-disciplina-related-table',
  templateUrl: './disciplina-related-table.component.html',
  styleUrls: ['./disciplina-related-table.component.css'],
})
export class DisciplinaRelatedTableComponent {
  relatedDisciplinaList: MatTableDataSource<any>;

  displayedColumns: string[] = ['nome', 'carga_horaria'];

  searchTerm: string = '';

  pageSize = 10;
  totalItems = 0;
  currentPage = 0;
  situacao = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  situacoes = new FormControl();
  situacoesList: any[] = [];

  constructor(
    private disciplinaService: DisciplinaService,
    public authService: AuthService
  ) {
    this.relatedDisciplinaList = new MatTableDataSource<any>([]);
    this.getRelatedDisciplinas();

    this.disciplinaService.getDisciplinaSituacoes().subscribe((data: any) => {
      this.situacoesList = data.data;
    });
  }

  getRelatedDisciplinas() {
    this.disciplinaService
      .getRelatedDisciplinas(
        this.searchTerm,
        this.currentPage,
        this.pageSize,
        this.situacao
      )
      .subscribe((data: any) => {
        this.relatedDisciplinaList = data.data;
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
}
