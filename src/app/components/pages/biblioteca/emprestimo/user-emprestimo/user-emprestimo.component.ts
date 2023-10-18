import { Component } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-user-emprestimo',
  templateUrl: './user-emprestimo.component.html',
  styleUrls: ['./user-emprestimo.component.css'],
})
export class UserEmprestimoComponent {
  emprestimos: any;
  displayedColumns: string[] = ['titulo', 'data_devolucao'];

  showCard: boolean = false;

  constructor(private bibliotecaService: BibliotecaService) {
    this.getEmpestimos();
  }

  getEmpestimos() {
    this.bibliotecaService.getUserEmprestimos().subscribe({
      next: (data: any) => {
        this.emprestimos = data.data;
        console.log(this.emprestimos);
        this.showCard = true;
      },
    });
  }
}
