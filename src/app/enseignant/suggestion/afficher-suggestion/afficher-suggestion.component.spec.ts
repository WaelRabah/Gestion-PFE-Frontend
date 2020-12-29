import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSuggestionComponent } from './afficher-suggestion.component';

describe('AfficherSuggestionComponent', () => {
  let component: AfficherSuggestionComponent;
  let fixture: ComponentFixture<AfficherSuggestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherSuggestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
