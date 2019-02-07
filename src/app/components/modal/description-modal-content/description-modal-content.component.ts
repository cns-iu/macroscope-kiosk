import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'lodash';
import { Subscription } from 'rxjs';

import { MacroscopeUiDescription } from '../../../shared/csv-typings';
import { MacroscopeDataService } from '../../../shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-description-modal-content',
  templateUrl: './description-modal-content.component.html',
  styleUrls: ['./description-modal-content.component.scss']
})
export class DescriptionModalContentComponent implements OnInit, OnDestroy {
  modalData: MacroscopeUiDescription;
  panelOpenState = false;
  expandPanel = false;
  private uiDescriptionSubscription: Subscription;

  constructor(
    private readonly dialogRef: MatDialogRef<DescriptionModalContentComponent>,
    private readonly macroscopeDataService: MacroscopeDataService,
    @Inject(MAT_DIALOG_DATA) private readonly modalDataOptions: MatDialogConfig<any>
  ) {
    this.modalData = {} as any;
  }

  ngOnInit() {
    this.uiDescriptionSubscription = this.macroscopeDataService.uiDescriptions.subscribe((data) => {
      this.modalData = filter(data, ['id', (this.modalDataOptions as any)['whereClicked']])[0];
      if (!this.modalData) {
        this.modalData = {} as any;
      }
    });
  }

  ngOnDestroy() {
    if (this.uiDescriptionSubscription) {
      this.uiDescriptionSubscription.unsubscribe();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
