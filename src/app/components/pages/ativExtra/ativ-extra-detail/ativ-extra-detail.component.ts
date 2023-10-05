import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AtivExtraService } from 'src/app/services/ativExtra/ativ-extra.service';

@Component({
  selector: 'app-ativ-extra-detail',
  templateUrl: './ativ-extra-detail.component.html',
  styleUrls: ['./ativ-extra-detail.component.css'],
})
export class AtivExtraDetailComponent {
  ativExtraInfo: any;
  showCard: boolean = false;

  constructor(
    private ativExtraService: AtivExtraService,
    private route: ActivatedRoute
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.ativExtraService.getAtivExtraDetail(id).subscribe({
      next: (data) => {
        this.ativExtraInfo = data.data;
        this.showCard = true;
      },
      error: () => {
        this.ativExtraInfo = {
          nome: 'ATIVIDADE EXTRACURRICULAR NÃO ENCONTRADO',
          descricao: 'O Atividade Extracurricular não foi encontrado',
        };
        this.showCard = true;
      },
    });
  }
}
