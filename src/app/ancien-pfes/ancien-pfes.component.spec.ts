import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AncienPfesComponent } from './ancien-pfes.component';

describe('AncienPfesComponent', () => {
  let component: AncienPfesComponent;
  let fixture: ComponentFixture<AncienPfesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AncienPfesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AncienPfesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
