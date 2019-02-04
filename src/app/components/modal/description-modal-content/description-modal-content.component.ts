import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MacroscopeDataService } from 'src/app/shared/services/macroscope-data/macroscope-data.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-description-modal-content',
  templateUrl: './description-modal-content.component.html',
  styleUrls: ['./description-modal-content.component.scss']
})
export class DescriptionModalContentComponent implements OnInit {

  modelData: any;
  panelOpenState = false;
  constructor(public dialogRef: MatDialogRef<DescriptionModalContentComponent>,
    public macroscopeDataService: MacroscopeDataService,
    @Inject(MAT_DIALOG_DATA) public modaDataOptions: any) { }

  ngOnInit() {
    this.macroscopeDataService.fetchAndParseCsv('assets/macroscope-ui-descriptions.csv').subscribe((data) => {
      this.modelData = _.filter(data, {'id': this.modaDataOptions['whereClicked'] });
      if (!this.modelData) {
        this.modelData = [];
      }
      console.log(data, this.modelData, this.modaDataOptions);
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
