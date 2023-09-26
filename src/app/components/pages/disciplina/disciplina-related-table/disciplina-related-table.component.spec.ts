import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisciplinaRelatedTableComponent } from './disciplina-related-table.component';

describe('DisciplinaRelatedTableComponent', () => {
  let component: DisciplinaRelatedTableComponent;
  let fixture: ComponentFixture<DisciplinaRelatedTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisciplinaRelatedTableComponent]
    });
    fixture = TestBed.createComponent(DisciplinaRelatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
