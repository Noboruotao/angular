import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { PessoaService } from 'src/app/services/pessoaService/pessoa.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pessoa-detail',
  templateUrl: './pessoa-detail.component.html',
  styleUrls: ['./pessoa-detail.component.css'],
  providers: [DatePipe]
})
export class PessoaDetailComponent {
  pessoa: any;
  pessoaFoto: any;

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    public authService: AuthService,
    private domSanitizer: DomSanitizer,
    private datePipe: DatePipe
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.pessoaService.getPessoa(id).subscribe((data: any) => {
      this.pessoa = data.data;
      this.pessoa.data_nascimento = this.datePipe.transform(
        this.pessoa.data_nascimento,
        'dd/MM/yyyy'
      );
      console.log(this.pessoa);
    });
    this.getFoto(id);
  }

  getFoto(id: number) {
    this.pessoaService.getFotoPessoa(id).subscribe(
      (resFoto) => {
        this.pessoaFoto = this.domSanitizer.bypassSecurityTrustUrl(
          URL.createObjectURL(resFoto)
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
