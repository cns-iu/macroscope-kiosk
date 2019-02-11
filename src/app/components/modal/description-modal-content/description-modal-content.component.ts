import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { MacroscopeData, MacroscopeUiDescription } from '../../../shared/csv-typings';

@Component({
  selector: 'app-description-modal-content',
  templateUrl: './description-modal-content.component.html',
  styleUrls: ['./description-modal-content.component.scss']
})
export class DescriptionModalContentComponent {
  expandPanelOpen = false;
  hasExpandPanelBeenOpenedOnce = false;

  get expandPanelText(): string {
    return this.expandPanelOpen ? 'Less Info' : 'More Info';
  }
  get expandPanelIcon(): string {
    return this.expandPanelOpen ? 'expand_less' : 'expand_more';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly modalData: MacroscopeUiDescription | MacroscopeData,
    private readonly dialogRef: MatDialogRef<DescriptionModalContentComponent>,
  ) { }

  toggleExpandedInfo(): void {
    this.expandPanelOpen = !this.expandPanelOpen;
    this.hasExpandPanelBeenOpenedOnce = true;
  }

  close(): void {
    this.dialogRef.close();
  }
}
