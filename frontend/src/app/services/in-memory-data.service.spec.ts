import { TestBed } from '@angular/core/testing';

import { InMemDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  let service: InMemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InMemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
