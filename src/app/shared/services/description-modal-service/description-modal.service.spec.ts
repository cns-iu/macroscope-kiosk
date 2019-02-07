import { TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialog } from '@angular/material';

import { DescriptionModalService } from './description-modal.service';

describe('DescriptionModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule],
    providers: [MatDialog]}));

  it('should be created', () => {
    const service: DescriptionModalService = TestBed.get(DescriptionModalService);
    expect(service).toBeTruthy();
  });
});
