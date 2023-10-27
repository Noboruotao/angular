import { Component } from '@angular/core';
import { faBaseball } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-secretaria-navbar',
  templateUrl: './secretaria-navbar.component.html',
  styleUrls: ['./secretaria-navbar.component.css'],
})
export class SecretariaNavbarComponent {
  faBaseball = faBaseball;
  constructor(public authService: AuthService) {}
}
