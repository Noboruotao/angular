import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAcervoComponent } from './make-acervo.component';

describe('MakeAcervoComponent', () => {
  let component: MakeAcervoComponent;
  let fixture: ComponentFixture<MakeAcervoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeAcervoComponent]
    });
    fixture = TestBed.createComponent(MakeAcervoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
