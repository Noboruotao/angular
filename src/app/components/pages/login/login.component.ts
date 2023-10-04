import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/authService/auth.service';
import { Login } from 'src/app/interfaces/login/login';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
  hide = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog
  ) {
    if (this.authService.userToken) {
      this.router.navigate([`home`]);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(
        this.loginData ? this.loginData.email : 'george77@terra.com.br',
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
        this.router.navigate([`home`]);
      },
      error: (error) => {
        this.dialog.open(LoginFailDialog);
      },
    });
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: './login-fail-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class LoginFailDialog {}
