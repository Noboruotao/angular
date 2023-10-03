import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoPresencaTableComponent } from './aluno-presenca-table.component';

describe('AlunoPresencaTableComponent', () => {
  let component: AlunoPresencaTableComponent;
  let fixture: ComponentFixture<AlunoPresencaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunoPresencaTableComponent]
    });
    fixture = TestBed.createComponent(AlunoPresencaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
