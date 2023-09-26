import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseDetailAlunoComponent } from './classe-detail-aluno.component';

describe('ClasseDetailAlunoComponent', () => {
  let component: ClasseDetailAlunoComponent;
  let fixture: ComponentFixture<ClasseDetailAlunoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseDetailAlunoComponent]
    });
    fixture = TestBed.createComponent(ClasseDetailAlunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
