import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DescriptionModalContentComponent } from '../description-modal-content/description-modal-content.component';

@Component({
  selector: 'app-description-modal-dialog',
  templateUrl: './description-modal-dialog.component.html',
  styleUrls: ['./description-modal-dialog.component.scss']
})
export class DescriptionModalDialogComponent implements OnInit {

  constructor(public dialog: MatDialog) {

  }

  ngOnInit() {
  }

  openDialog(linkId: string): void {
    const dialogRef = this.dialog.open(DescriptionModalContentComponent, {
      data: {'whereClicked': linkId}
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
