import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeNotaFinalComponent } from './make-nota-final.component';

describe('MakeNotaFinalComponent', () => {
  let component: MakeNotaFinalComponent;
  let fixture: ComponentFixture<MakeNotaFinalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeNotaFinalComponent]
    });
    fixture = TestBed.createComponent(MakeNotaFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
