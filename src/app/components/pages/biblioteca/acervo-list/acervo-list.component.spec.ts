import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcervoListComponent } from './acervo-list.component';

describe('AcervoListComponent', () => {
  let component: AcervoListComponent;
  let fixture: ComponentFixture<AcervoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcervoListComponent]
    });
    fixture = TestBed.createComponent(AcervoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
