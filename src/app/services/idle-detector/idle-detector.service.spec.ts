import { TestBed } from '@angular/core/testing';

import { IdleDetectorService } from './idle-detector.service';

describe('IdleDetectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IdleDetectorService = TestBed.get(IdleDetectorService);
    expect(service).toBeTruthy();
  });
});
