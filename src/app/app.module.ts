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

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './interceptors/jwt/jwt.interceptor';
import { MatTabsModule } from '@angular/material/tabs';
import { AcervoListComponent } from './components/pages/biblioteca/acervo/acervo-list/acervo-list.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AcervoComponent } from './components/pages/biblioteca/acervo/acervo-detail/acervo.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ListCursoComponent } from './components/pages/curso/list-curso/list-curso.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
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
import { PessoaDetailComponent } from './components/pages/pessoa/pessoa-detail/pessoa-detail.component';
import { MakeNotaComponent } from './components/pages/classe/make-nota/make-nota.component';
import { MakeNotaFinalComponent } from './components/pages/classe/make-nota-final/make-nota-final.component';
import { MakeNotaFinalTableComponent } from './components/pages/classe/make-nota-final-table/make-nota-final-table.component';
import { AlunoPresencaTableComponent } from './components/pages/classe/aluno-presenca-table/aluno-presenca-table.component';
import { AtivExtraListComponent } from './components/pages/ativExtra/ativ-extra-list/ativ-extra-list.component';
import { AtivExtraTableComponent } from './components/pages/ativExtra/ativ-extra-table/ativ-extra-table.component';
import { AtivExtraSugeridosTableComponent } from './components/pages/ativExtra/ativ-extra-sugeridos-table/ativ-extra-sugeridos-table.component';
import { AtivExtraDetailComponent } from './components/pages/ativExtra/ativ-extra-detail/ativ-extra-detail.component';
import { EmprestimoListComponent } from './components/pages/biblioteca/emprestimo/emprestimo-list/emprestimo-list.component';
import { EmprestimoListTableComponent } from './components/pages/biblioteca/emprestimo/emprestimo-list-table/emprestimo-list-table.component';
import {
  EmprestimoDetailComponent,
  ConfirmDevolucaoDialog,
} from './components/pages/biblioteca/emprestimo/emprestimo-detail/emprestimo-detail.component';
import { MakeEmprestimoComponent } from './components/pages/biblioteca/emprestimo/make-emprestimo/make-emprestimo.component';
import { ListMultasComponent } from './components/pages/secretaria/list-multas/list-multas.component';
import { ListMultasTableComponent } from './components/pages/secretaria/list-multas-table/list-multas-table.component';
import {
  MultaDetailComponent,
  PagarMultaDialog,
} from './components/pages/secretaria/multa-detail/multa-detail.component';
import { MakeAcervoComponent } from './components/pages/biblioteca/acervo/make-acervo/make-acervo.component';
import { AlunoProfessorNavbarComponent } from './components/layout/navbar/aluno-professor-navbar/aluno-professor-navbar.component';
import { BibliotecarioNavbarComponent } from './components/layout/navbar/bibliotecario-navbar/bibliotecario-navbar.component';
import { AcervoFormComponent } from './components/pages/biblioteca/acervo/acervo-form/acervo-form.component';

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
    MakeNotaFinalComponent,
    MakeNotaFinalTableComponent,
    AlunoPresencaTableComponent,
    AtivExtraListComponent,
    AtivExtraTableComponent,
    AtivExtraSugeridosTableComponent,
    AtivExtraDetailComponent,
    EmprestimoListComponent,
    EmprestimoListTableComponent,
    EmprestimoDetailComponent,
    MakeEmprestimoComponent,
    ListMultasComponent,
    ListMultasTableComponent,
    MultaDetailComponent,
    PagarMultaDialog,
    ConfirmDevolucaoDialog,
    MakeAcervoComponent,
    AlunoProfessorNavbarComponent,
    BibliotecarioNavbarComponent,
    AcervoFormComponent,
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
    MatCheckboxModule,
    MatTabsModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatAutocompleteModule,
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
