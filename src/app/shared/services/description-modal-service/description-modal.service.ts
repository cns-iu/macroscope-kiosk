import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  DescriptionModalDialogComponent,
} from '../../../components/modal/description-modal-dialog/description-modal-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DescriptionModalService {

  descriptionModalDialogInstance: DescriptionModalDialogComponent;
  constructor(private dialog: MatDialog) {
    this.descriptionModalDialogInstance = new DescriptionModalDialogComponent(dialog);
  }

  openModal(linkId: string, type: string) {
    this.descriptionModalDialogInstance.openDialog(linkId, type);
  }

  closeModal() {
    this.descriptionModalDialogInstance.dialog.closeAll();
  }
}
