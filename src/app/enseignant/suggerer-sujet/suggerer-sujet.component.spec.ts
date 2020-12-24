import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggererSujetComponent } from './suggerer-sujet.component';

describe('SuggererSujetComponent', () => {
  let component: SuggererSujetComponent;
  let fixture: ComponentFixture<SuggererSujetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggererSujetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggererSujetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
