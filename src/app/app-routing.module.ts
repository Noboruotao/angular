import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AuthGuardService } from './services/authGuard/auth-guard.service';
import { AcervoListComponent } from './components/pages/biblioteca/acervo-list/acervo-list.component';
import { AcervoComponent } from './components/pages/biblioteca/acervo/acervo/acervo.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  {
    path: 'biblioteca/acervo/list',
    component: AcervoListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'biblioteca/acervo/:id',
    component: AcervoComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
