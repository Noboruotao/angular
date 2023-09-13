import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/interfaces/user/user';
import { AuthService } from 'src/app/services/authService/auth.service';
import { PessoaService } from 'src/app/services/pessoaService/pessoa.service';
import 'bootstrap';
import { ActivatedRoute } from '@angular/router';

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

  openUrl: string = '';

  isBibliotecaTreeViewOpen = false;

  constructor(
    private pessoaService: PessoaService,
    private authService: AuthService,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.authService.userData;
    this.getFoto();
    this.route.url.subscribe((segments) => {
      if (segments.length >= 1) {
        this.openUrl = segments[0].path;

        this.isBibliotecaTreeViewOpen = this.openUrl == 'biblioteca';
      }
    });
  }

  get userData() {
    return this.user;
  }

  checkPermission(permissions: String[]) {
    for (var permission of permissions) {
      if (
        Object.values(this.authService.permissions).indexOf(permission) > -1
      ) {
        return true;
      }
    }
    return false;
  }

  checkRoles(roles: String[]) {
    for (var role of roles) {
      if (
        Object.values(Object.values(this.authService.roles).indexOf(role) > -1)
      ) {
        return true;
      }
    }
    return false;
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

  toggleBibliotecaTreeView() {
    this.isBibliotecaTreeViewOpen = !this.isBibliotecaTreeViewOpen;
  }
}
