import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivExtraDetailComponent } from './ativ-extra-detail.component';

describe('AtivExtraDetailComponent', () => {
  let component: AtivExtraDetailComponent;
  let fixture: ComponentFixture<AtivExtraDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivExtraDetailComponent]
    });
    fixture = TestBed.createComponent(AtivExtraDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
