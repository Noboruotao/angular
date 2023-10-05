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
  showCard: boolean = false;
  showCardBody: boolean = false;
  user_id: number;

  constructor(
    public authService: AuthService,
    private classeService: ClasseService,
    private route: ActivatedRoute
  ) {
    this.user_id = this.authService.userData.id;

    this.classe_id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.authService.checkRoles(['Professor'])) {
      this.classeService.getAlunos(this.classe_id).subscribe((data: any) => {
        this.alunos = new MatTableDataSource<any>(data.data);
      });

      this.classeService.getClasseDetail(this.classe_id).subscribe({
        next: (data) => {
          this.classe = data.data;
          this.showCard = true;
          this.showCardBody = true;
        },
        error: () => {
          this.showCard = true;
        },
      });
    }
  }
}
