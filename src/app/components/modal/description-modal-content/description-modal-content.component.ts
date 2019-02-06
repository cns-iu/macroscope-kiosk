import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { filter } from 'lodash';
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
    @Inject(MAT_DIALOG_DATA) public modaDataOptions: any) {
      this.modelData = {};
    }

  ngOnInit() {
    const fileName = this.modaDataOptions['type'] === 'macroscope-ui' ?
    'assets/macroscope-ui-descriptions.csv' : 'assets/macroscope-data.csv';
    this.macroscopeDataService.fetchAndParseCsv(fileName).subscribe((data) => {
      this.modelData = filter(data, {'id': this.modaDataOptions['whereClicked'] })[0];
      if (!this.modelData) {
        this.modelData = {};
      }
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }
}
