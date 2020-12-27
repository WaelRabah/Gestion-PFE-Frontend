import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficheEnsComponent } from './affiche.component';

describe('AfficheEnsComponent', () => {
  let component: AfficheEnsComponent;
  let fixture: ComponentFixture<AfficheEnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficheEnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficheEnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
