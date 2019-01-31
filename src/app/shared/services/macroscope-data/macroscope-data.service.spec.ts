import { inject, TestBed } from '@angular/core/testing';

import { MacroscopeDataService } from './macroscope-data.service';

describe('MacroscopeDataService', () => {
  let service: MacroscopeDataService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [MacroscopeDataService]
  }));

  beforeEach(inject([MacroscopeDataService], (_service: MacroscopeDataService) => {
    service = _service;
  }));

  it('should get the macroscope data when correct path is given', (done) => {
    service.fetchAndParseCsv('assets/macroscope-data.csv')
    .subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
      done();
    }, () => {
      done.fail();
    });
  });

  it('should get the macroscope data when wrong path is given', (done) => {
    service.fetchAndParseCsv('wrong/path/given.csv')
    .subscribe(() => {
      done.fail();
    }, (error) => {
      expect(error).toBeDefined();
      done();
    });
  });
});
