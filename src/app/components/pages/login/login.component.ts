import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from 'src/app/services/authService/auth.service';
import { MensagemService } from 'src/app/services/mensagem/mensagem.service';

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

  senhaIcon = faEye;
  senhaType = 'password';

  constructor(
    private authService: AuthService,
    private mensagemService: MensagemService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(
        this.loginData ? this.loginData.email : 'ovaldez@terra.com.br',
        [Validators.required]
      ),
      senha: new FormControl(
        this.loginData ? this.loginData.senha : 'password',
        [Validators.required]
      ),
    });
  }

  hideShowPassword() {
    this.senhaType = this.senhaType === 'text' ? 'password' : 'text';
    this.senhaIcon = this.senhaIcon === faEye ? faEyeSlash : faEye;
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
        this.mensagemService.add(error);
        console.log(error);
      },
    });
  }
}
