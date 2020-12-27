import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPfeComponent } from './gestion-pfe.component';

describe('GestionPfeComponent', () => {
  let component: GestionPfeComponent;
  let fixture: ComponentFixture<GestionPfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionPfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
