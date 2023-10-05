import { Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';

import { faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-emprestimo-list-table',
  templateUrl: './emprestimo-list-table.component.html',
  styleUrls: ['./emprestimo-list-table.component.css'],
})
export class EmprestimoListTableComponent {
  emprestimos: MatTableDataSource<any>;
  displayedColumns: string[] = ['leitor', 'titulo', 'multa'];

  pendente: boolean = true;
  pageSize = 5;
  totalItems = 0;
  currentPage = 0;
  faCheck = faCheck;
  constructor(private bibliotecaService: BibliotecaService) {
    this.getEmprestimos();
  }

  getEmprestimos() {
    this.bibliotecaService
      .getEmprestimos(this.pendente, this.pageSize, this.currentPage)
      .subscribe({
        next: (data) => {
          this.emprestimos = data.data;
          this.totalItems = data.count;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEmprestimos();
  }

  onSelectChange() {
    this.pendente = !this.pendente;
    this.currentPage = 0;
    this.getEmprestimos();
  }
}
