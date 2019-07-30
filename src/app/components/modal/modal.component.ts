import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ModalData } from '../../shared/modal-typings';


/**
 * Modal component for displaying all the modals in the applicaiton
 */
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  /**
   * Flag that holds the value to determine if panel is open or not
   */
  expandPanelOpen = false;

  /**
   * Flag that holds the value to determine if the panel was opened once or not
   */
  hasExpandPanelBeenOpenedOnce = false;


  /**
   * Gets the text that is shown is user wants to see more infromation or less information
   */
  get expandPanelText(): string {
    return this.expandPanelOpen ? 'Less Info' : 'More Info';
  }


  /**
   * Gets expand panel icon for more information section state.
   * It can be in 'More Info' state or 'Less Info' state
   */
  get expandPanelIcon(): string {
    return this.expandPanelOpen ? 'expand_less' : 'expand_more';
  }


  /**
   * Creates an instance of modal component.
   * @param modalData The data that needs to be displayed on the modal like Description Short or Description Long
   * @param dialogRef Holds the reference of the modal which needs to be shown
   */
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly modalData: ModalData,
    private readonly dialogRef: MatDialogRef<ModalComponent>,
  ) { }


  /**
   * Responsible for toggle the between 'More Info' and 'Less Info' in the modals
   */
  toggleExpandedInfo(): void {
    this.expandPanelOpen = !this.expandPanelOpen;
    this.hasExpandPanelBeenOpenedOnce = true;
  }


  /**
   * Responsibile for closing the modal
   */
  close(): void {
    this.dialogRef.close();
  }
}
