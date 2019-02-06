import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DescriptionModalContentComponent } from '../description-modal-content/description-modal-content.component';

@Component({
  selector: 'app-description-modal-dialog',
  templateUrl: './description-modal-dialog.component.html',
  styleUrls: ['./description-modal-dialog.component.scss']
})
export class DescriptionModalDialogComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(linkId: string, type: string): void {
    this.dialog.open(DescriptionModalContentComponent, {
      data: {'whereClicked': linkId, 'type': type},
      width: '65rem',
      panelClass: 'modal-dialog-container'
    });
  }
}
