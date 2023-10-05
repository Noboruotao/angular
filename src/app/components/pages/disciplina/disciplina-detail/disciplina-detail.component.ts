import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisciplinaService } from 'src/app/services/disciplina/disciplina.service';

@Component({
  selector: 'app-disciplina-detail',
  templateUrl: './disciplina-detail.component.html',
  styleUrls: ['./disciplina-detail.component.css'],
})
export class DisciplinaDetailComponent implements OnInit {
  disciplina: any;

  classes: any;
  notas: any;
  nota_final: Number;
  showCard: boolean = false;
  showCardBody: boolean = false;

  constructor(
    private disciplinaService: DisciplinaService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.disciplinaService.getDisciplina(id).subscribe({
      next: (data) => {
        this.disciplina = data.data;
        this.showCard = true;
        this.showCardBody = true;
      },
      error: (error) => {
        this.disciplina = { nome: 'Não Encontrado' };
        this.showCard = true;

      },
    });
  }
}
