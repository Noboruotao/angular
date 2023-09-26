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
  faAngleDown,
  faUser,
  faGraduationCap,
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
  faAngleDown = faAngleDown;
  faUser = faUser;
  faGraduationCap = faGraduationCap;

  openUrl: string = '';

  isBibliotecaTreeViewOpen = false;
  isAlunoTreeViewOpen = false;
  isCursoTreeViewOpen = false;
  isClasseTreeViewOpen = false;
  isDisciplinaTreeViewOpen = false;

  constructor(
    private pessoaService: PessoaService,
    protected authService: AuthService,
    private domSanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.user = this.authService.userData;
    this.getFoto();
    this.route.url.subscribe((segments) => {
      if (segments.length >= 1) {
        this.openUrl = segments[0].path;

        this.isAlunoTreeViewOpen = this.openUrl == 'aluno';
        this.isCursoTreeViewOpen = this.openUrl == 'curso';
        this.isBibliotecaTreeViewOpen = this.openUrl == 'biblioteca';
        this.isClasseTreeViewOpen = this.openUrl == 'classe';
        this.isDisciplinaTreeViewOpen = this.openUrl == 'disciplina';
      }
    });
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

  toggleBibliotecaTreeView() {
    this.isBibliotecaTreeViewOpen = !this.isBibliotecaTreeViewOpen;
  }

  toggleAlunoTreeView() {
    this.isAlunoTreeViewOpen = !this.isAlunoTreeViewOpen;
  }

  toggleCursoTreeView() {
    this.isCursoTreeViewOpen = !this.isCursoTreeViewOpen;
  }
  toggleDisciplinaTreeView() {
    this.isDisciplinaTreeViewOpen = !this.isDisciplinaTreeViewOpen;
  }
  toggleClasseTreeView() {
    this.isClasseTreeViewOpen = !this.isClasseTreeViewOpen;
  }
}
