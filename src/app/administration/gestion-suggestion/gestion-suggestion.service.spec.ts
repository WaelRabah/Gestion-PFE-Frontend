import { TestBed } from '@angular/core/testing';

import { GestionSuggestionService } from './gestion-suggestion.service';

describe('GestionSuggestionService', () => {
  let service: GestionSuggestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionSuggestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
