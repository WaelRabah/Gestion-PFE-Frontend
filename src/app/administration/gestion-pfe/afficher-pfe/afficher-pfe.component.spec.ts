import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherPfeComponent } from './afficher-pfe.component';

describe('AfficherPfeComponent', () => {
  let component: AfficherPfeComponent;
  let fixture: ComponentFixture<AfficherPfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherPfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherPfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
