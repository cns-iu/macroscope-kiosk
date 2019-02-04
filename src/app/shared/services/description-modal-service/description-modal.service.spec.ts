import { TestBed } from '@angular/core/testing';

import { DescriptionModalService } from './description-modal.service';

describe('DescriptionModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DescriptionModalService = TestBed.get(DescriptionModalService);
    expect(service).toBeTruthy();
  });
});
