import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ClasseService } from 'src/app/services/classe/classe.service';

@Component({
  selector: 'app-classe-detail-aluno',
  templateUrl: './classe-detail-aluno.component.html',
  styleUrls: ['./classe-detail-aluno.component.css'],
})
export class ClasseDetailAlunoComponent {
  classe: any;

  constructor(
    private classeService: ClasseService,
    private route: ActivatedRoute
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.classeService.getClasseDetail(id).subscribe((data: any) => {
      this.classe = data.data;
    });

  }
}
