import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivExtraSugeridosTableComponent } from './ativ-extra-sugeridos-table.component';

describe('AtivExtraSugeridosTableComponent', () => {
  let component: AtivExtraSugeridosTableComponent;
  let fixture: ComponentFixture<AtivExtraSugeridosTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivExtraSugeridosTableComponent]
    });
    fixture = TestBed.createComponent(AtivExtraSugeridosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
