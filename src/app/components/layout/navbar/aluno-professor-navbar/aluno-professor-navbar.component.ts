import { Component } from '@angular/core';
import {
  faBookOpen,
  faAngleRight,
  faAngleDown,
  faUser,
  faGraduationCap,
  faUserGroup,
  faBaseball,
  faWalking,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-aluno-professor-navbar',
  templateUrl: './aluno-professor-navbar.component.html',
  styleUrls: ['./aluno-professor-navbar.component.css'],
})
export class AlunoProfessorNavbarComponent {
  faBookOpen = faBookOpen;
  faAngleRight = faAngleRight;
  faAngleDown = faAngleDown;
  faUser = faUser;
  faGraduationCap = faGraduationCap;
  faUserGroup = faUserGroup;
  faBaseball = faBaseball;
  faWalking = faWalking;

  constructor(protected authService: AuthService) {}
}
