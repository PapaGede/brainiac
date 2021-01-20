import { TestBed } from '@angular/core/testing';

import { RequetsService } from './requets.service';

describe('RequetsService', () => {
  let service: RequetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
