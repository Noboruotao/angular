import { Component } from '@angular/core';
import { AtivExtraService } from 'src/app/services/ativExtra/ativ-extra.service';
import { AtivExtraTipo } from 'src/app/interfaces/AtivExtra/ativ-extra';

@Component({
  selector: 'app-ativ-extra-list',
  templateUrl: './ativ-extra-list.component.html',
  styleUrls: ['./ativ-extra-list.component.css'],
})
export class AtivExtraListComponent {
  tipos: AtivExtraTipo;

  constructor(private ativEsxtraService: AtivExtraService) {
    this.ativEsxtraService.getAtivExtraTipo().subscribe((data) => {
      this.tipos = data;
    });
  }
}
