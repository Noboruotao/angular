import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';

import {
  faBookOpen,
  faUser,
  faGraduationCap,
  faUserGroup,
  faBaseball,
  faWalking,
  faMoneyBill1Wave,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bibliotecario-navbar',
  templateUrl: './bibliotecario-navbar.component.html',
  styleUrls: ['./bibliotecario-navbar.component.css'],
})
export class BibliotecarioNavbarComponent {
  faBookOpen = faBookOpen;
  faUser = faUser;
  faGraduationCap = faGraduationCap;
  faUserGroup = faUserGroup;
  faBaseball = faBaseball;
  faWalking = faWalking;
  faMoneyBill1Wave = faMoneyBill1Wave;
  constructor(protected authService: AuthService) {}
}
