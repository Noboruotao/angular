import { Component } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-emprestimo',
  templateUrl: './user-emprestimo.component.html',
  styleUrls: ['./user-emprestimo.component.css'],
})
export class UserEmprestimoComponent {
  emprestimos: any;
  displayedColumns: string[] = ['titulo', 'data_devolucao'];

  faArrowsRotate = faArrowsRotate;

  showCard: boolean = false;

  constructor(private bibliotecaService: BibliotecaService) {
    this.getEmprestimos();
  }

  getEmprestimos() {
    this.bibliotecaService.getUserEmprestimos().subscribe({
      next: (data: any) => {
        if (data.success) {
          this.emprestimos = data.data;
          this.showCard = true;
        }
      },
      error: (error) => {
        this.emprestimos = [];
        console.log(error.error.message);
      },
    });
  }
}
