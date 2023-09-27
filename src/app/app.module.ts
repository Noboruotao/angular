import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/pages/login/login.component';
import { HomeComponent } from './components/pages/home/home.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { PreloaderComponent } from './components/layout/preloader/preloader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { AcervoListComponent } from './components/pages/biblioteca/acervo-list/acervo-list.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AcervoComponent } from './components/pages/biblioteca/acervo/acervo.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ListCursoComponent } from './components/pages/curso/list-curso/list-curso.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { DetalhesCursoComponent } from './components/pages/curso/detalhes-curso/detalhes-curso.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './helper/custom-mat-paginator-intl';
import { ListDisciplinaComponent } from './components/pages/disciplina/list-disciplina/list-disciplina.component';
import { CursosTableComponent } from './components/pages/curso/cursos-table/cursos-table.component';
import { CursosSugeridosTableComponent } from './components/pages/curso/cursos-sugeridos-table/cursos-sugeridos-table.component';
import { DisciplinaTableComponent } from './components/pages/disciplina/disciplina-table/disciplina-table.component';
import { DisciplinaRelatedTableComponent } from './components/pages/disciplina/disciplina-related-table/disciplina-related-table.component';
import { DisciplinaDetailComponent } from './components/pages/disciplina/disciplina-detail/disciplina-detail.component';
import { NotasTableComponent } from './components/pages/disciplina/notas-table/notas-table.component';
import { ClasseListComponent } from './components/pages/classe/classe-list/classe-list.component';
import { ClasseTableComponent } from './components/pages/classe/classe-table/classe-table.component';
import { ClasseAlunoTableComponent } from './components/pages/classe/classe-aluno-table/classe-aluno-table.component';
import { ClasseDetailComponent } from './components/pages/classe/classe-detail/classe-detail.component';
import { ClasseDetailAlunoComponent } from './components/pages/classe/classe-detail-aluno/classe-detail-aluno.component';
import { PessoaDetailComponent } from './components/pages/pessoa/pessoa-detail/pessoa-detail/pessoa-detail.component';
import { MakeNotaComponent } from './components/pages/classe/make-nota/make-nota/make-nota.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    PreloaderComponent,
    AcervoListComponent,
    AcervoComponent,
    ListCursoComponent,
    DetalhesCursoComponent,
    ListDisciplinaComponent,
    CursosTableComponent,
    CursosSugeridosTableComponent,
    DisciplinaTableComponent,
    DisciplinaRelatedTableComponent,
    DisciplinaDetailComponent,
    NotasTableComponent,
    ClasseListComponent,
    ClasseTableComponent,
    ClasseAlunoTableComponent,
    ClasseDetailComponent,
    ClasseDetailAlunoComponent,
    PessoaDetailComponent,
    MakeNotaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: MatPaginatorIntl,
      useClass: CustomMatPaginatorIntl,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
