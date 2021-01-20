import { TestBed } from '@angular/core/testing';

import { GamerNameService } from './gamer-name.service';

describe('GamerNameService', () => {
  let service: GamerNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamerNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
