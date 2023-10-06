import { Component } from '@angular/core';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-emprestimo-detail',
  templateUrl: './emprestimo-detail.component.html',
  styleUrls: ['./emprestimo-detail.component.css'],
})
export class EmprestimoDetailComponent {
  emprestimo: any;
  showCard: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private bibliotecaService: BibliotecaService
  ) {
    const id: number = Number(this.route.snapshot.paramMap.get('id'));
    this.bibliotecaService.getEmprestimoDetail(id).subscribe({
      next: (data) => {
        this.emprestimo = data.data;
        this.showCard = true;
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }
}
