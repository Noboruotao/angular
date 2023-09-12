import { Component, OnInit } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-acervo-list',
  templateUrl: './acervo-list.component.html',
  styleUrls: ['./acervo-list.component.css'],
})
export class AcervoListComponent implements OnInit {
  limit: number = 12;
  page: number = 0;
  order: string = 'asc';
  column: string = 'titulo';

  acervoList: any = [];

  faSearch = faSearch;
  searchTerm: string = '';

  baseUrl = environment.baseApiUrl;
  bibliotecaUrl = `${this.baseUrl}api/biblioteca`;
  constructor(private bibliotecaService: BibliotecaService) {}

  ngOnInit() {
    this.bibliotecaService
      .getAcervoslist(this.limit, this.page, this.order, this.column)
      .subscribe((data: any) => {
        this.acervoList = data.data;
      });
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    this.searchTerm = value;

    this.bibliotecaService
      .getAcervoslist(
        this.limit,
        this.page,
        this.order,
        this.column,
        this.searchTerm
      )
      .subscribe((data: any) => {
        this.acervoList = data.data;
      });
  }
}
