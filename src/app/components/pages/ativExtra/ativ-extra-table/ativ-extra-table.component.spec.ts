import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivExtraTableComponent } from './ativ-extra-table.component';

describe('AtivExtraTableComponent', () => {
  let component: AtivExtraTableComponent;
  let fixture: ComponentFixture<AtivExtraTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivExtraTableComponent]
    });
    fixture = TestBed.createComponent(AtivExtraTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
