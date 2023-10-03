import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivExtraListComponent } from './ativ-extra-list.component';

describe('AtivExtraListComponent', () => {
  let component: AtivExtraListComponent;
  let fixture: ComponentFixture<AtivExtraListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivExtraListComponent]
    });
    fixture = TestBed.createComponent(AtivExtraListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
