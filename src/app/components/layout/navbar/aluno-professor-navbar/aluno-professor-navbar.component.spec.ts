import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlunoProfessorNavbarComponent } from './aluno-professor-navbar.component';

describe('AlunoProfessorNavbarComponent', () => {
  let component: AlunoProfessorNavbarComponent;
  let fixture: ComponentFixture<AlunoProfessorNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlunoProfessorNavbarComponent]
    });
    fixture = TestBed.createComponent(AlunoProfessorNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
