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

  constructor(private authService: AuthService, private router: Router) {}

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
