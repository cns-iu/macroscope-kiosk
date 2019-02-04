import { Injectable } from '@angular/core';
import { DescriptionModalDialogComponent } from '../../../components/modal/description-modal-dialog/description-modal-dialog.component';
import { MatDialog } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class DescriptionModalService {

  descriptionModalDialogInstance: DescriptionModalDialogComponent;
  constructor(private dialog: MatDialog) {
    this.descriptionModalDialogInstance = new DescriptionModalDialogComponent(dialog);
  }

  openModal(linkId: string) {
    this.descriptionModalDialogInstance.openDialog(linkId);
  }
}
