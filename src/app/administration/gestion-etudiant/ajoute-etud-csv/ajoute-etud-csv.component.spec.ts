import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteEtudCsvComponent } from './ajoute-etud-csv.component';

describe('AjouteEtudCsvComponent', () => {
  let component: AjouteEtudCsvComponent;
  let fixture: ComponentFixture<AjouteEtudCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteEtudCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteEtudCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
