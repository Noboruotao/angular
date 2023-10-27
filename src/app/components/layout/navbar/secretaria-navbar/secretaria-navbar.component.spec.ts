import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaNavbarComponent } from './secretaria-navbar.component';

describe('SecretariaNavbarComponent', () => {
  let component: SecretariaNavbarComponent;
  let fixture: ComponentFixture<SecretariaNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretariaNavbarComponent]
    });
    fixture = TestBed.createComponent(SecretariaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
