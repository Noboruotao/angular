import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { AcervoListComponent } from './components/pages/biblioteca/acervo-list/acervo-list.component';
import { AcervoComponent } from './components/pages/biblioteca/acervo/acervo.component';
import { ListCursoComponent } from './components/pages/curso/list-curso/list-curso.component';
import { DetalhesCursoComponent } from './components/pages/curso/detalhes-curso/detalhes-curso.component';
import { ListDisciplinaComponent } from './components/pages/disciplina/list-disciplina/list-disciplina.component';
import { DisciplinaDetailComponent } from './components/pages/disciplina/disciplina-detail/disciplina-detail.component';
import { ClasseListComponent } from './components/pages/classe/classe-list/classe-list.component';
import { ClasseDetailComponent } from './components/pages/classe/classe-detail/classe-detail.component';
import { PessoaDetailComponent } from './components/pages/pessoa/pessoa-detail/pessoa-detail/pessoa-detail.component';
import { MakeNotaComponent } from './components/pages/classe/make-nota/make-nota/make-nota.component';
import { MakeNotaFinalComponent } from './components/pages/classe/make-nota-final/make-nota-final/make-nota-final.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      { path: 'home', component: HomeComponent },

      {
        path: 'biblioteca/acervo/list',
        component: AcervoListComponent,
      },
      {
        path: 'biblioteca/acervo/:id',
        component: AcervoComponent,
      },

      {
        path: 'curso/list',
        component: ListCursoComponent,
      },
      {
        path: 'curso/:id',
        component: DetalhesCursoComponent,
      },

      {
        path: 'disciplina/list',
        component: ListDisciplinaComponent,
      },
      {
        path: 'disciplina/:id',
        component: DisciplinaDetailComponent,
      },
      {
        path: 'classe/list',
        component: ClasseListComponent,
      },
      {
        path: 'classe/nota',
        component: MakeNotaComponent,
      },
      {
        path: 'classe/notaFinal',
        component: MakeNotaFinalComponent,
      },
      {
        path: 'classe/:id',
        component: ClasseDetailComponent,
      },
      {
        path: 'pessoa/:id',
        component: PessoaDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
