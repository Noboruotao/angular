import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth.service';
import { BibliotecaService } from 'src/app/services/biblioteca/biblioteca.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-acervo',
  templateUrl: './acervo.component.html',
  styleUrls: ['./acervo.component.css'],
})
export class AcervoComponent implements OnInit {
  baseUrl = environment.baseApiUrl;
  bibliotecaUrl = `${this.baseUrl}api/biblioteca`;
  acervo: any;
  constructor(
    private bibliotecaService: BibliotecaService,
    private route: ActivatedRoute,
    public authService: AuthService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bibliotecaService.getAcervo(id).subscribe((data: any) => {
      this.acervo = data.data;
    });
  }
}
