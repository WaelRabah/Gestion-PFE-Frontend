import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySoutenanceComponent } from './modify-soutenance.component';

describe('ModifySoutenanceComponent', () => {
  let component: ModifySoutenanceComponent;
  let fixture: ComponentFixture<ModifySoutenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifySoutenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifySoutenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
