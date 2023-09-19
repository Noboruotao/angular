import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDisciplinaComponent } from './list-disciplina.component';

describe('ListDisciplinaComponent', () => {
  let component: ListDisciplinaComponent;
  let fixture: ComponentFixture<ListDisciplinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListDisciplinaComponent]
    });
    fixture = TestBed.createComponent(ListDisciplinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
