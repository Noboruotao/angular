import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivExtraAlunoTableComponent } from './ativ-extra-aluno-table.component';

describe('AtivExtraAlunoTableComponent', () => {
  let component: AtivExtraAlunoTableComponent;
  let fixture: ComponentFixture<AtivExtraAlunoTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AtivExtraAlunoTableComponent]
    });
    fixture = TestBed.createComponent(AtivExtraAlunoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
