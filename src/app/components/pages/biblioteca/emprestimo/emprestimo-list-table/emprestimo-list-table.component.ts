import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  durationInSeconds = 5;

  searchTerm: string = '';
  error_message = ';';

  faCheck = faCheck;
  constructor(
    private bibliotecaService: BibliotecaService,
    private _snackBar: MatSnackBar
  ) {
    this.getEmprestimos();
  }

  getEmprestimos() {
    this.bibliotecaService
      .getEmprestimos(
        this.pendente,
        this.pageSize,
        this.currentPage,
        this.searchTerm
      )
      .subscribe((data) => {
        this.emprestimos = data.data;
        this.totalItems = data.count;
        if (data.success == false) {
          this.openSnackBar(data.message);
        }
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

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 0;
    this.getEmprestimos();
  }

  openSnackBar(message: string, action: string = 'Fechar') {
    this._snackBar.open(message, action, { duration: 2000 });
  }
}
