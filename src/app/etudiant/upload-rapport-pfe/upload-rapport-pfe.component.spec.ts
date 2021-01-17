import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadRapportPfeComponent } from './upload-rapport-pfe.component';

describe('UploadRapportPfeComponent', () => {
  let component: UploadRapportPfeComponent;
  let fixture: ComponentFixture<UploadRapportPfeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadRapportPfeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadRapportPfeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
