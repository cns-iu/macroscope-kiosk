import { Component, OnInit } from '@angular/core';
import { MacroscopeDataService } from 'src/app/shared/services/macroscope-data/macroscope-data.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-screen-saver-header',
  templateUrl: './screen-saver-header.component.html',
  styleUrls: ['./screen-saver-header.component.scss']
})
export class ScreenSaverHeaderComponent implements OnInit {

  content: any;
  constructor(public macroscopeDataService: MacroscopeDataService) {
    this.content = {};
   }

  ngOnInit() {
    this.macroscopeDataService.fetchAndParseCsv('assets/macroscope-ui-descriptions.csv').subscribe((data) => {
      this.content = _.filter(data, {'id': 'screensaver' })[0];
      if (!this.content) {
        this.content = {};
      }
    });
  }

}
