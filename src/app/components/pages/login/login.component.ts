import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/authService/auth.service';
import { Login } from 'src/app/interfaces/login/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Input() loginData: Login | null = null;
  @Output() onSubmit = new EventEmitter<Login>();

  loginForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(
        this.loginData ? this.loginData.email : 'nrosa@maldonado.net.br',
        [Validators.required]
      ),
      senha: new FormControl(
        this.loginData ? this.loginData.senha : 'password',
        [Validators.required]
      ),
    });
  }

  email() {
    return this.loginForm.get('email');
  }

  senha() {
    return this.loginForm.get('senha');
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('email', this.loginForm.get('email')!.value);
    formData.append('senha', this.loginForm.get('senha')!.value);

    this.authService.login(formData).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate([`home`]);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
