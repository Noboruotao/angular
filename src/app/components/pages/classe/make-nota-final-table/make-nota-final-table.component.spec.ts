import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeNotaFinalTableComponent } from './make-nota-final-table.component';

describe('MakeNotaFinalTableComponent', () => {
  let component: MakeNotaFinalTableComponent;
  let fixture: ComponentFixture<MakeNotaFinalTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeNotaFinalTableComponent]
    });
    fixture = TestBed.createComponent(MakeNotaFinalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
