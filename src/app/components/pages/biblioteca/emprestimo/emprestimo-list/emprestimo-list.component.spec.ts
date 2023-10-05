import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoListComponent } from './emprestimo-list.component';

describe('EmprestimoListComponent', () => {
  let component: EmprestimoListComponent;
  let fixture: ComponentFixture<EmprestimoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmprestimoListComponent]
    });
    fixture = TestBed.createComponent(EmprestimoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
