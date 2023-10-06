import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeEmprestimoComponent } from './make-emprestimo.component';

describe('MakeEmprestimoComponent', () => {
  let component: MakeEmprestimoComponent;
  let fixture: ComponentFixture<MakeEmprestimoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeEmprestimoComponent]
    });
    fixture = TestBed.createComponent(MakeEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
