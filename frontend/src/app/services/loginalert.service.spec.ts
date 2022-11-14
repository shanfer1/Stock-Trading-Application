import { TestBed } from '@angular/core/testing';

import { LoginalertService } from './loginalert.service';

describe('LoginalertService', () => {
  let service: LoginalertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginalertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
