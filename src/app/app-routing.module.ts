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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
