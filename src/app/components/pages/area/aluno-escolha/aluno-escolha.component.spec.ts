import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoEscolhaComponent } from './aluno-escolha.component';

describe('AlunoEscolhaComponent', () => {
  let component: AlunoEscolhaComponent;
  let fixture: ComponentFixture<AlunoEscolhaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunoEscolhaComponent]
    });
    fixture = TestBed.createComponent(AlunoEscolhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
