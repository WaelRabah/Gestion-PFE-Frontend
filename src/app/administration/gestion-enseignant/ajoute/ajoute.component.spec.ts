import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteEnsComponent } from './ajoute.component';

describe('AjouteEnsComponent', () => {
  let component: AjouteEnsComponent;
  let fixture: ComponentFixture<AjouteEnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteEnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
