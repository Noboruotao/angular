import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AreaService } from 'src/app/services/area/area.service';
import { AuthService } from 'src/app/services/authService/auth.service';

@Component({
  selector: 'app-aluno-escolha',
  templateUrl: './aluno-escolha.component.html',
  styleUrls: ['./aluno-escolha.component.css'],
})
export class AlunoEscolhaComponent {
  areas: any;
  showCard: boolean = false;

  isLoading: boolean = false;
  areas_escolhidas: string[] = [];

  constructor(
    private areaService: AreaService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.permitPage(['Aluno']);
    this.areaService.getAreas(2).subscribe({
      next: (response: any) => {
        this.areas = response.data;
        this.showCard = true;
      },
    });
  }

  isChecked(codigo: string) {
    return this.areas_escolhidas.includes(codigo);
  }

  escolher(codigo: string) {
    if (this.areas_escolhidas.includes(codigo)) {
      this.areas_escolhidas = this.areas_escolhidas.filter(
        (item) => item !== codigo
      );
    } else {
      this.areas_escolhidas.push(codigo);

      if (this.areas_escolhidas.length > 5) {
        this.areas_escolhidas.shift();
      }
    }
  }

  enviar() {
    this.isLoading = true;
    this.areaService.getEscolhas(this.areas_escolhidas).subscribe({
      next: (value) => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        alert('error');
      },
    });
  }
}
