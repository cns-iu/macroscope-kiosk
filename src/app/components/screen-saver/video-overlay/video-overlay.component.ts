import { Component, OnDestroy } from '@angular/core';
import { find } from 'lodash';
import { Subscription } from 'rxjs';
import { MacroscopeUiDescription } from 'src/app/shared/csv-typings';

import { MacroscopeDataService } from '../../../shared/services/macroscope-data/macroscope-data.service';


/**
 * Vide overlay component declaration
 */
@Component({
  selector: 'app-video-overlay',
  templateUrl: './video-overlay.component.html',
  styleUrls: ['./video-overlay.component.scss']
})
/**
 * Video overlay component is responisble for updating the DescriptionTitle, DescriptionShort for the screen saer
 */
export class VideoOverlayComponent implements OnDestroy {

  /**
   * Holds the title information for the screen saver
   */
  title: string;

  /**
   * Holds the subtitle information for the screensaver
   */
  subtitle: string;


  /**
   * Holds the subscription to get the screen saver details
   */
  private dataSubscription: Subscription;


  /**
   * Creates an instance of video overlay component.
   * @param dataService Service to parse the CSV and get the related data.
   */
  constructor(dataService: MacroscopeDataService) {
    this.dataSubscription = dataService.uiDescriptions.subscribe(data => {
      const item = find(data, ['id', 'screensaver']) || { } as MacroscopeUiDescription;
      ({ descriptionTitle: this.title, descriptionShort: this.subtitle } = item);
    });
  }


  /**
   * Called just before destroying the component, all cleanup taks should be done here, for example, unsubscriptions
   */
  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
