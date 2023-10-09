import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMultasTableComponent } from './list-multas-table.component';

describe('ListMultasTableComponent', () => {
  let component: ListMultasTableComponent;
  let fixture: ComponentFixture<ListMultasTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMultasTableComponent]
    });
    fixture = TestBed.createComponent(ListMultasTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
