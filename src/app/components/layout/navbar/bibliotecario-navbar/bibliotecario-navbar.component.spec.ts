import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecarioNavbarComponent } from './bibliotecario-navbar.component';

describe('BibliotecarioNavbarComponent', () => {
  let component: BibliotecarioNavbarComponent;
  let fixture: ComponentFixture<BibliotecarioNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BibliotecarioNavbarComponent]
    });
    fixture = TestBed.createComponent(BibliotecarioNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
