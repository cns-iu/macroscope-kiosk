import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter } from 'lodash';
import { Subscription } from 'rxjs';

import { MacroscopeUiDescription } from '../../../shared/csv-typings';
import { MacroscopeDataService } from '../../../shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-screen-saver-header',
  templateUrl: './screen-saver-header.component.html',
  styleUrls: ['./screen-saver-header.component.scss']
})
export class ScreenSaverHeaderComponent implements OnInit, OnDestroy {
  content: MacroscopeUiDescription;
  private uiDescriptionsSubscription: Subscription;

  constructor(public macroscopeDataService: MacroscopeDataService) { }

  ngOnInit() {
    this.uiDescriptionsSubscription = this.macroscopeDataService.uiDescriptions.subscribe((data) => {
      this.content = filter(data, ['id', 'screensaver'])[0];
    });
  }

  ngOnDestroy() {
    if (this.uiDescriptionsSubscription) {
      this.uiDescriptionsSubscription.unsubscribe();
    }
  }
}
