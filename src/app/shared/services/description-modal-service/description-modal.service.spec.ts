import { TestBed } from '@angular/core/testing';

import { DescriptionModalService } from './description-modal.service';
import { MatDialogModule, MatDialog } from '@angular/material';

describe('DescriptionModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule],
    providers: [MatDialog]}));

  it('should be created', () => {
    const service: DescriptionModalService = TestBed.get(DescriptionModalService);
    expect(service).toBeTruthy();
  });
});
