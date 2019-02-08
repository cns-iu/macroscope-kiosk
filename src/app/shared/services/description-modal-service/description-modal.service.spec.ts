import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';

import { DescriptionModalService } from './description-modal.service';

describe('DescriptionModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule, HttpClientModule],
    providers: [MatDialog]}));

  it('should be created', () => {
    const service: DescriptionModalService = TestBed.get(DescriptionModalService);
    expect(service).toBeTruthy();
  });
});
