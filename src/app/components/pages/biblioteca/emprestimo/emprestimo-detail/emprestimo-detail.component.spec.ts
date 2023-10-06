import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoDetailComponent } from './emprestimo-detail.component';

describe('EmprestimoDetailComponent', () => {
  let component: EmprestimoDetailComponent;
  let fixture: ComponentFixture<EmprestimoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmprestimoDetailComponent]
    });
    fixture = TestBed.createComponent(EmprestimoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
