import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

import { MacroscopeData, MacroscopeUiDescription } from '../../../shared/csv-typings';
import { MacroscopeDataService } from '../../../shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-description-modal-content',
  templateUrl: './description-modal-content.component.html',
  styleUrls: ['./description-modal-content.component.scss']
})
export class DescriptionModalContentComponent implements OnDestroy {
  panelOpenState = false;
  firstOpened = true;
  expandPanel = false;
  private uiDescriptionSubscription: Subscription;

  constructor(
    private readonly dialogRef: MatDialogRef<DescriptionModalContentComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly modalData: MacroscopeUiDescription | MacroscopeData
  ) { }

  ngOnDestroy() {
    if (this.uiDescriptionSubscription) {
      this.uiDescriptionSubscription.unsubscribe();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
