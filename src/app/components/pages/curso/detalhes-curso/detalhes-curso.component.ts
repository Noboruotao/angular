import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CursoService } from 'src/app/services/curso/curso.service';

@Component({
  selector: 'app-detalhes-curso',
  templateUrl: './detalhes-curso.component.html',
  styleUrls: ['./detalhes-curso.component.css'],
})
export class DetalhesCursoComponent {
  curso: any = [];
  constructor(
    private cursoService: CursoService,
    private route: ActivatedRoute
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.curso = this.cursoService.getCurso(id).subscribe((data: any) => {
      console.log(data);
      this.curso = data.data;
    });
  }
}
