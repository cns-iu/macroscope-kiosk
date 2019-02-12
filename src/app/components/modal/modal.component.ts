import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ModalData } from '../../shared/modal-typings';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  expandPanelOpen = false;
  hasExpandPanelBeenOpenedOnce = false;

  get expandPanelText(): string {
    return this.expandPanelOpen ? 'Less Info' : 'More Info';
  }
  get expandPanelIcon(): string {
    return this.expandPanelOpen ? 'expand_less' : 'expand_more';
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly modalData: ModalData,
    private readonly dialogRef: MatDialogRef<ModalComponent>,
  ) { }

  toggleExpandedInfo(): void {
    this.expandPanelOpen = !this.expandPanelOpen;
    this.hasExpandPanelBeenOpenedOnce = true;
  }

  close(): void {
    this.dialogRef.close();
  }
}
