import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMultasComponent } from './list-multas.component';

describe('ListMultasComponent', () => {
  let component: ListMultasComponent;
  let fixture: ComponentFixture<ListMultasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListMultasComponent]
    });
    fixture = TestBed.createComponent(ListMultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
