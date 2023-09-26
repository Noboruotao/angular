import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaNotasTableComponent } from './notas-table.component';

describe('NotasTableComponent', () => {
  let component: NotasTableComponent;
  let fixture: ComponentFixture<NotasTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotasTableComponent]
    });
    fixture = TestBed.createComponent(NotasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
