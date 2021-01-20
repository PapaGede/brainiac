import { TestBed } from '@angular/core/testing';

import { GamePlayDataService } from './game-play-data.service';

describe('GamePlayDataService', () => {
  let service: GamePlayDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamePlayDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
