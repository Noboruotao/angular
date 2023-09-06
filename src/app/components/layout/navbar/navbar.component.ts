import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/interfaces/user/user';
import { AuthService } from 'src/app/services/authService/auth.service';
import { PessoaService } from 'src/app/services/pessoaService/pessoa.service';
import {
  faHome,
  faBookOpen,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user: any;
  userFoto!: any;

  faHome = faHome;
  faBookOpen = faBookOpen;
  faAngleRight = faAngleRight;

  constructor(
    private pessoaService: PessoaService,
    private authService: AuthService,
    private domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.user = this.authService.userData;
    this.getFoto();
  }

  get userData() {
    return this.user;
  }

  getFoto() {
    if (this.pessoaService.pessoaFoto) {
      this.userFoto = this.pessoaService.pessoaFoto;
    } else {
      this.pessoaService.getFotoPessoa(this.user.id).subscribe(
        (resFoto) => {
          this.userFoto = this.domSanitizer.bypassSecurityTrustUrl(
            URL.createObjectURL(resFoto)
          );
          this.pessoaService.pessoaFoto = this.userFoto;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
