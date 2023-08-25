import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MensagemService {
  mensagem!: string;
  constructor() {}

  add(message: string) {
    this.mensagem = message;
    setTimeout(() => {
      this.clear();
    }, 4000);
  }

  clear() {
    this.mensagem = '';
  }
}
