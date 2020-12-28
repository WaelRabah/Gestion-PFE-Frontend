import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherSuggestionsComponent } from './afficher-suggestions.component';

describe('AfficherSuggestionsComponent', () => {
  let component: AfficherSuggestionsComponent;
  let fixture: ComponentFixture<AfficherSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
