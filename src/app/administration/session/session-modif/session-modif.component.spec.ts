import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionModifComponent } from './session-modif.component';

describe('SessionModifComponent', () => {
  let component: SessionModifComponent;
  let fixture: ComponentFixture<SessionModifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionModifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionModifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
