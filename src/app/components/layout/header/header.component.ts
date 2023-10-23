import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {
  faBars,
  faSearch,
  faComment,
  faBell,
  faThLarge,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/authService/auth.service';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faBars = faBars;
  faSearch = faSearch;
  faComment = faComment;
  faBell = faBell;
  faThLarge = faThLarge;
  faRightFromBracket = faRightFromBracket;

  emprestimos_atrasados: Number;
  notificacaoQnt: Number;

  constructor(private authService: AuthService, private router: Router) {
    this.atualizarNotificacao();
    setInterval(() => {
      this.atualizarNotificacao();
    }, 3000);
  }

  atualizarNotificacao() {
    this.emprestimos_atrasados = this.authService.emprestimos_atrasados;
    this.notificacaoQnt = this.authService.notificacaoQnt;
  }

  logout() {
    this.authService.logout().subscribe({
      next: (response) => {
        this.router.navigate([`login`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
