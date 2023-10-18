import { Component } from '@angular/core';
import 'bootstrap';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public authService: AuthService) {}
}
