import { Component } from '@angular/core';
import { MensagemService } from 'src/app/services/mensagem/mensagem.service';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css'],
})
export class MensagemComponent {
  faTimes = faTimes;

  constructor(public mensagemService: MensagemService) {}
}
