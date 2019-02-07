import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MacroscopeData, MacroscopeUiDescription } from 'src/app/shared/csv-typings';

import { DescriptionModalContentComponent } from '../description-modal-content/description-modal-content.component';

@Component({
  selector: 'app-description-modal-dialog',
  templateUrl: './description-modal-dialog.component.html',
  styleUrls: ['./description-modal-dialog.component.scss']
})
export class DescriptionModalDialogComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(data: MacroscopeUiDescription | MacroscopeData): void {
    this.dialog.open(DescriptionModalContentComponent, {
      data: data,
      width: '65rem',
      panelClass: 'modal-dialog-container'
    });
  }
}
