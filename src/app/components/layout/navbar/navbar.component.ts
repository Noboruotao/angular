import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/interfaces/user/user';
import { AuthService } from 'src/app/services/authService/auth.service';
import { PessoaService } from 'src/app/services/pessoaService/pessoa.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user!: User;
  userFoto!: any;

  constructor(
    private pessoaService: PessoaService,
    private authService: AuthService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.authService.validateToken().subscribe({
      next: (response) => {
        this.user = response.data.user;
        this.getFoto();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  get userData() {
    return this.user;
  }

  getFoto() {
    this.pessoaService.getFotoPessoa(this.userData.id).subscribe(
      (resFoto) => {
        this.userFoto = this.domSanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(resFoto)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
