import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AlunoClasse } from 'src/app/interfaces/alunoClasse/aluno-classe';

import { ClasseService } from 'src/app/services/classe/classe.service';
@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrls: ['./classe-detail.component.css'],
})
export class ClasseDetailComponent {
  alunos: MatTableDataSource<AlunoClasse>;
  classe_id: number;
  classe: any;

  constructor(
    public authService: AuthService,
    private classeService: ClasseService,
    private route: ActivatedRoute
  ) {
    this.classe_id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.authService.checkRoles(['Professor'])) {
      this.classeService.getAlunos(this.classe_id).subscribe((data: any) => {
        this.alunos = new MatTableDataSource<any>(data.data);
      });

      this.classeService
        .getClasseDetail(this.classe_id)
        .subscribe((data: any) => {
          this.classe = data.data;
        });
    }
  }
}
