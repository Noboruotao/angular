import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
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

  constructor(
    private disciplinaService: DisciplinaService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.disciplinaService.getDisciplina(id).subscribe((data: any) => {
      this.disciplina = data.data;
      console.log(this.disciplina);
    });
  }
}
