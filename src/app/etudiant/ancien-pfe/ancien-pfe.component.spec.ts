import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AncienPfeComponent } from './ancien-pfe.component';

describe('AncienPfeComponent', () => {
  let component: AncienPfeComponent;
  let fixture: ComponentFixture<AncienPfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AncienPfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AncienPfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
