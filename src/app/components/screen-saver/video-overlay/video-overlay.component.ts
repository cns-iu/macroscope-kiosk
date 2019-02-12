import { Component, OnDestroy } from '@angular/core';
import { find } from 'lodash';
import { Subscription } from 'rxjs';
import { MacroscopeUiDescription } from 'src/app/shared/csv-typings';

import { MacroscopeDataService } from '../../../shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-video-overlay',
  templateUrl: './video-overlay.component.html',
  styleUrls: ['./video-overlay.component.scss']
})
export class VideoOverlayComponent implements OnDestroy {
  title: string;
  subtitle: string;

  private dataSubscription: Subscription;

  constructor(dataService: MacroscopeDataService) {
    this.dataSubscription = dataService.uiDescriptions.subscribe(data => {
      const item = find(data, ['id', 'screensaver']) || { } as MacroscopeUiDescription;
      ({ descriptionTitle: this.title, descriptionShort: this.subtitle } = item);
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
