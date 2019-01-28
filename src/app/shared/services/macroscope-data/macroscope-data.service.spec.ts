import { TestBed } from '@angular/core/testing';

import { MacroscopeDataService } from './macroscope-data.service';

describe('MacroscopeDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MacroscopeDataService = TestBed.get(MacroscopeDataService);
    expect(service).toBeTruthy();
  });
});
