import { Component, OnInit, ViewChild } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-acervo-list',
  templateUrl: './acervo-list.component.html',
  styleUrls: ['./acervo-list.component.css'],
})
export class AcervoListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pageSize = 24;
  totalItems = 0;
  currentPage = 0;

  order: string = 'asc';
  column: string = 'titulo';

  acervoList: any = [];

  faSearch = faSearch;
  searchTerm: string = '';

  baseUrl = environment.baseApiUrl;
  bibliotecaUrl = `${this.baseUrl}api/biblioteca`;

  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit() {
    this.getAcervos();
  }

  getAcervos() {
    this.bibliotecaService
      .getAcervoslist(
        this.pageSize,
        this.currentPage,
        this.order,
        this.column,
        this.searchTerm
      )
      .subscribe((data: any) => {
        this.acervoList = data.data;
        this.totalItems = data.count;
      });
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    this.searchTerm = target.value;

    this.getAcervos();
    this.currentPage = 0;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAcervos();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
