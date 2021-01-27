import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListerEncadrementsComponent } from './lister-encadrements.component';

describe('ListerEncadrementsComponent', () => {
  let component: ListerEncadrementsComponent;
  let fixture: ComponentFixture<ListerEncadrementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListerEncadrementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListerEncadrementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
