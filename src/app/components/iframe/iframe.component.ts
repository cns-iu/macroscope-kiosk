import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { find as loFind } from 'lodash';
import { combineLatest, Subscription } from 'rxjs';
import { filter as rxFilter, map as rxMap } from 'rxjs/operators';

import { MacroscopeData } from '../../shared/csv-typings';
import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';


/**
 * Iframe component responsible for holding the iframe
 */
@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IFrameComponent implements OnDestroy {

  /**
   * Determined if the content in iframe is video or not.
   */
  isVideo: boolean;

  /**
   * Macroscope url that is attached to the Iframe
   */
  macroscopeUrl: string;


  /**
   * Holds subscription for the url parameters like iterationId, MacroscopeId
   * Then these ids are used to get the data of Macroscope from the CSV
   */
  private readonly subscription: Subscription;


  /**
   * Creates an instance of iframe component.
   * @param dataService The service used to get the Macroscope data
   * @param route Holds the active route, from where we get the params like Iteration Id, Macroscope Id
   */
  constructor(
    dataService: MacroscopeDataService,
    route: ActivatedRoute
  ) {
    this.subscription = combineLatest(
      dataService.data,
      route.paramMap.pipe(rxMap(pmap => ({
        iterationId: +pmap.get('iid'),
        macroId: +pmap.get('mid')
      })))
    ).pipe(
      rxMap(([data, filter]) => loFind(data, filter) as MacroscopeData),
      rxFilter(item => item !== undefined)
    ).subscribe(({ type, url }) => {
      this.isVideo = type === 'video';
      this.macroscopeUrl = url;
    });
  }


  /**
   * Called just before the instance of component is destroyed.
   * All clean up code should be here. For example: unsubscribe observables.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
