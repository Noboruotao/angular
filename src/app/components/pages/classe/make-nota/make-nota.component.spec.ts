import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeNotaComponent } from './make-nota.component';

describe('MakeNotaComponent', () => {
  let component: MakeNotaComponent;
  let fixture: ComponentFixture<MakeNotaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeNotaComponent]
    });
    fixture = TestBed.createComponent(MakeNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
