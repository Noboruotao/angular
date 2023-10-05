import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprestimoListTableComponent } from './emprestimo-list-table.component';

describe('EmprestimoListTableComponent', () => {
  let component: EmprestimoListTableComponent;
  let fixture: ComponentFixture<EmprestimoListTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmprestimoListTableComponent]
    });
    fixture = TestBed.createComponent(EmprestimoListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
