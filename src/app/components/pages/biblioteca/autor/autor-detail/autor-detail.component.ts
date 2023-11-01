import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-autor-detail',
  templateUrl: './autor-detail.component.html',
  styleUrls: ['./autor-detail.component.css'],
})
export class AutorDetailComponent {
  autor: any;
  showCard: boolean = false;

  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.bibliotecaService.getAutor(id).subscribe({
      next: (data: any) => {
        console.log(data.data);
        this.autor = data.data;
        this.showCard = true;
      },
      error: (error) => {
        console.log(error.error);
      },
    });
  }
}
