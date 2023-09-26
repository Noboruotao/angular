import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-classe-detail',
  templateUrl: './classe-detail.component.html',
  styleUrls: ['./classe-detail.component.css'],
})
export class ClasseDetailComponent {
  constructor(public authService: AuthService) {}
}
