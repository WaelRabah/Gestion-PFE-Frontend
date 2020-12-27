import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionEtudiantComponent } from './gestion-etudiant.component';

describe('GestionEtudiantComponent', () => {
  let component: GestionEtudiantComponent;
  let fixture: ComponentFixture<GestionEtudiantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionEtudiantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
