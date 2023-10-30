import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  Inject,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AtivExtraService } from 'src/app/services/ativExtra/ativ-extra.service';
import { AuthService } from 'src/app/services/authService/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ativ-extra-aluno-table',
  templateUrl: './ativ-extra-aluno-table.component.html',
  styleUrls: ['./ativ-extra-aluno-table.component.css'],
})
export class AtivExtraAlunoTableComponent implements OnChanges {
  alunos: MatTableDataSource<any>;
  @Input() ativExtra_id: number;
  error_message: string = '';

  displayedColumns: string[] = ['nome', 'action'];

  currentPage = 0;
  pageSize = 10;
  totalItems = 0;

  constructor(
    private ativExtraService: AtivExtraService,
    public dialog: MatDialog,
    public authService: AuthService
  ) {
    this.alunos = new MatTableDataSource<any>([]);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.ativExtra_id = changes['ativExtra_id'].currentValue;
    this.getAlunos();
  }

  getAlunos() {
    this.ativExtraService
      .getAlunos(this.ativExtra_id, this.currentPage, this.pageSize)
      .subscribe({
        next: (data: any) => {
          this.alunos = new MatTableDataSource(data.data);
          this.totalItems = data.count;
        },
        error: (error) => {
          this.error_message = error.error.message;
        },
      });
  }

  removeAluno(row: any) {
    const dialogRef = this.dialog.open(RemoverAlunoAtivExtra, {
      data: { aluno: row, ativExtra_id: this.ativExtra_id },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getAlunos();
    });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getAlunos();
  }
}

@Component({
  selector: 'remover-aluno-ativExtra-dialog',
  templateUrl: './remover-aluno-dialog.html',
  standalone: true,
  imports: [
    MatDialogModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
})
export class RemoverAlunoAtivExtra {
  isDisabled: boolean = true;

  constructor(
    private ativExtraService: AtivExtraService,
    public dialogRef: MatDialogRef<any>,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  removeAlunoFromAtivExtra() {
    this.ativExtraService
      .removeAlunoFromAtivExtra(this.data.aluno.id, this.data.ativExtra_id)
      .subscribe({
        next: (data) => {
          this.openSnackbar('Aluno Removido com Sucesso.');
          // this.closeDialog(true);
          this.dialogRef.close(true);
        },
        error: (error) => {
          this.openSnackbar(error.error.message);
          // this.closeDialog(false);
          this.dialogRef.close(false);
        },
      });
  }

  openSnackbar(message: string, action: string = 'Fechar') {
    this._snackbar.open(message, action);
  }

  closeDialog(reload: boolean = true) {
    this.dialogRef.close(reload);
  }
}
