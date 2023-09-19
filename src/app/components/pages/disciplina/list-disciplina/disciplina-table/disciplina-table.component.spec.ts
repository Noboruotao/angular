import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaTableComponent } from './disciplina-table.component';

describe('DisciplinaTableComponent', () => {
  let component: DisciplinaTableComponent;
  let fixture: ComponentFixture<DisciplinaTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplinaTableComponent]
    });
    fixture = TestBed.createComponent(DisciplinaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
