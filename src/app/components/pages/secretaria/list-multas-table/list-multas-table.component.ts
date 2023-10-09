import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SecretariaService } from 'src/app/services/secretaria/secretaria.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-multas-table',
  templateUrl: './list-multas-table.component.html',
  styleUrls: ['./list-multas-table.component.css'],
})
export class ListMultasTableComponent {
  multas: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'nome',
    'mensagem',
    'dias_atrasados',
    'valor',
    'pago',
  ];

  faX = faX;

  pago = false;
  pageSize = 5;
  totalItems = 0;
  currentPage = 0;
  durationInSeconds = 5;
  searchTerm: string = '';

  constructor(
    private secretariaService: SecretariaService,
    private _snackBar: MatSnackBar
  ) {
    this.getMultas();
  }

  getMultas() {
    this.secretariaService
      .getMultas(this.pago, this.currentPage, this.pageSize, this.searchTerm)
      .subscribe({
        next: (data: any) => {
          this.multas = data.data;
          this.totalItems = data.count;
        },
        error: (error) => {
          this.openSnackBar(error.error.message);
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMultas();
  }

  onSelectChange() {
    this.pago = !this.pago;
    this.currentPage = 0;
    this.getMultas();
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getMultas();
  }

  openSnackBar(message: string, action: string = 'Fechar') {
    this._snackBar.open(message, action, { duration: 2000 });
  }

  formatDate(inputDate: string): string {
    const dateObj = new Date(inputDate);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${day}/${month}/${year}`;
  }
}
