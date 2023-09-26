import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasseTableComponent } from './classe-table.component';

describe('ClasseTableComponent', () => {
  let component: ClasseTableComponent;
  let fixture: ComponentFixture<ClasseTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClasseTableComponent]
    });
    fixture = TestBed.createComponent(ClasseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
