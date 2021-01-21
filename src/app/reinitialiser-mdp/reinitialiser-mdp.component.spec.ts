import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReinitialiserMdpComponent } from './reinitialiser-mdp.component';

describe('ReinitialiserMdpComponent', () => {
  let component: ReinitialiserMdpComponent;
  let fixture: ComponentFixture<ReinitialiserMdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReinitialiserMdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReinitialiserMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
