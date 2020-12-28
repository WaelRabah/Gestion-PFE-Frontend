import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuserSuggestionComponent } from './refuser-suggestion.component';

describe('RefuserSuggestionComponent', () => {
  let component: RefuserSuggestionComponent;
  let fixture: ComponentFixture<RefuserSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefuserSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefuserSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
