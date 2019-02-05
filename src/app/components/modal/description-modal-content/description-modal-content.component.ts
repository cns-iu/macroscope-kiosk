import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import * as _ from 'lodash';
import { MacroscopeDataService } from 'src/app/shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-description-modal-content',
  templateUrl: './description-modal-content.component.html',
  styleUrls: ['./description-modal-content.component.scss']
})
export class DescriptionModalContentComponent implements OnInit {

  modelData: any;
  panelOpenState = false;
  expandPanel = false;
  constructor(public dialogRef: MatDialogRef<DescriptionModalContentComponent>,
    public macroscopeDataService: MacroscopeDataService,
    @Inject(MAT_DIALOG_DATA) public modaDataOptions: any) { }

  ngOnInit() {
    this.macroscopeDataService.fetchAndParseCsv('assets/macroscope-ui-descriptions.csv').subscribe((data) => {
      this.modelData = _.filter(data, {'id': this.modaDataOptions['whereClicked'] });
      if (!this.modelData) {
        this.modelData = [];
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
