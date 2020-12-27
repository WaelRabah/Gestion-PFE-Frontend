import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccepterPfeComponent } from './accepter-pfe.component';

describe('AccepterPfeComponent', () => {
  let component: AccepterPfeComponent;
  let fixture: ComponentFixture<AccepterPfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccepterPfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccepterPfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
