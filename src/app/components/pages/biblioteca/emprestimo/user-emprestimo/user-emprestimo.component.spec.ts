import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEmprestimoComponent } from './user-emprestimo.component';

describe('UserEmprestimoComponent', () => {
  let component: UserEmprestimoComponent;
  let fixture: ComponentFixture<UserEmprestimoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserEmprestimoComponent]
    });
    fixture = TestBed.createComponent(UserEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
