import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccepterSuggestionComponent } from './accepter-suggestion.component';

describe('AccepterSuggestionComponent', () => {
  let component: AccepterSuggestionComponent;
  let fixture: ComponentFixture<AccepterSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccepterSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccepterSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
