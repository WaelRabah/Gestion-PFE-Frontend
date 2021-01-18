import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteEnsCsvComponent } from './ajoute-ens-csv.component';

describe('AjouteEnsCsvComponent', () => {
  let component: AjouteEnsCsvComponent;
  let fixture: ComponentFixture<AjouteEnsCsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteEnsCsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteEnsCsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
