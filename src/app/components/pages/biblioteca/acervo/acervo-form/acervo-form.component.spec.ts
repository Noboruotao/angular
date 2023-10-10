import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcervoFormComponent } from './acervo-form.component';

describe('AcervoFormComponent', () => {
  let component: AcervoFormComponent;
  let fixture: ComponentFixture<AcervoFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcervoFormComponent]
    });
    fixture = TestBed.createComponent(AcervoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
