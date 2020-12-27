import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuserPfeComponent } from './refuser-pfe.component';

describe('RefuserPfeComponent', () => {
  let component: RefuserPfeComponent;
  let fixture: ComponentFixture<RefuserPfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuserPfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuserPfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
