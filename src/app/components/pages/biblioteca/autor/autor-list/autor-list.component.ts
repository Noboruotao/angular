import { Component } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { PageEvent } from '@angular/material/paginator';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css'],
})
export class AutorListComponent {
  autors: any;

  showCard: boolean = false;
  currentPage = 0;
  pageSize = 10;
  totalItems = 0;
  searchTerm: string = '';

  faPlus = faPlus;

  constructor(private bibliotecaService: BibliotecaService) {
    this.getAutors();
  }

  getAutors() {
    this.bibliotecaService
      .listAutors(this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (data: any) => {
          // console.log(data.data);
          this.autors = data.data;
          this.totalItems = data.count;
          this.showCard = true;
        },
        error: (error) => {
          console.log(error.error);
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAutors();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
