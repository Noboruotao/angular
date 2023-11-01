import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorDetailComponent } from './autor-detail.component';

describe('AutorDetailComponent', () => {
  let component: AutorDetailComponent;
  let fixture: ComponentFixture<AutorDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutorDetailComponent]
    });
    fixture = TestBed.createComponent(AutorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
