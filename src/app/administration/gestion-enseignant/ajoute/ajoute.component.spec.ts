import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouteComponent } from './ajoute.component';

describe('AjouteComponent', () => {
  let component: AjouteComponent;
  let fixture: ComponentFixture<AjouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
