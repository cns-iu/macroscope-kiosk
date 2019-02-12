import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { find as loFind } from 'lodash';
import { combineLatest, Subscription } from 'rxjs';
import { filter as rxFilter, map as rxMap } from 'rxjs/operators';

import { MacroscopeData } from '../../shared/csv-typings';
import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IFrameComponent implements OnDestroy {
  isVideo: boolean;
  macroscopeUrl: string;

  private readonly subscription: Subscription;

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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
