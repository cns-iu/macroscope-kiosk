import { async, TestBed, inject } from '@angular/core/testing';

import { MacroscopeDataService } from './macroscope-data.service';

describe('MacroscopeDataService', () => {
  let service;
  beforeEach(() => TestBed.configureTestingModule({
    providers: [MacroscopeDataService]
  }));

  beforeEach(inject([MacroscopeDataService], (_service) => {
    service = _service;
  }));

  it('should get the macroscope data when correct path is given', (done) => {
    service.getMacroscopeData('assets/macroscope-data.csv')
    .subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
      done();
    }, (error) => {
      done.fail();
    });
  });

  it('should get the macroscope data when wrong path is given', (done) => {
    service.getMacroscopeData('wrong/path/given.csv')
    .subscribe((data) => {
      done.fail();
    }, (error) => {
      expect(error).toBeDefined();
      done();
    });
  });
});
