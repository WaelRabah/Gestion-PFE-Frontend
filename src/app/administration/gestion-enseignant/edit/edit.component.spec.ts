import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEnsComponent } from './edit.component';

describe('EditEnsComponent', () => {
  let component: EditEnsComponent;
  let fixture: ComponentFixture<EditEnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
