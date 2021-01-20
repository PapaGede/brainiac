import { TestBed } from '@angular/core/testing';

import { HostNameService } from './host-name.service';

describe('HostNameService', () => {
  let service: HostNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HostNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
