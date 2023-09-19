import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosSugeridosTableComponent } from './cursos-sugeridos-table.component';

describe('CursosSugeridosTableComponent', () => {
  let component: CursosSugeridosTableComponent;
  let fixture: ComponentFixture<CursosSugeridosTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosSugeridosTableComponent]
    });
    fixture = TestBed.createComponent(CursosSugeridosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
