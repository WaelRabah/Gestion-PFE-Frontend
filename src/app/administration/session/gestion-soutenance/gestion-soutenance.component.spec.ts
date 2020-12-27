import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionSoutenanceComponent } from './gestion-soutenance.component';

describe('GestionSoutenanceComponent', () => {
  let component: GestionSoutenanceComponent;
  let fixture: ComponentFixture<GestionSoutenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionSoutenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionSoutenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
