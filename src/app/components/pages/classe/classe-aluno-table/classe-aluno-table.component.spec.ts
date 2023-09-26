import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseAlunoTableComponent } from './classe-aluno-table.component';

describe('ClasseAlunoTableComponent', () => {
  let component: ClasseAlunoTableComponent;
  let fixture: ComponentFixture<ClasseAlunoTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseAlunoTableComponent]
    });
    fixture = TestBed.createComponent(ClasseAlunoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
