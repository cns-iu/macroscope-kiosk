import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { MacroscopeData } from '../../shared/csv-typings';
import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IFrameComponent implements OnDestroy {
  activatedRouteParamsSubscription: Subscription;
  macroscopeDataServiceSubscription: Subscription;
  macroscopeUrl: SafeResourceUrl;
  isVideo: boolean;

  constructor(
    private readonly macroscopeDataService: MacroscopeDataService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sanitize: DomSanitizer
  ) {
      this.macroscopeDataServiceSubscription = this.macroscopeDataService.data.subscribe((data: MacroscopeData[]) => {
      this.updateMacroscope(data);
    });
  }

  updateMacroscope(data: MacroscopeData[]): void {
    this.activatedRouteParamsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      const iterationId = params['iid'];
      const macroId = params['mid'];
      const activeMacroscopeData = data.find((row: MacroscopeData) => {
        return row['iterationId'] === parseInt(iterationId, 10) && row['macroId'] === parseInt(macroId, 10);
      });
      if (activeMacroscopeData) {
        this.macroscopeUrl = this.sanitize.bypassSecurityTrustResourceUrl(activeMacroscopeData.url);

        if (activeMacroscopeData.type === 'video') {
          this.isVideo = true;
        } else {
          this.isVideo = false;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.activatedRouteParamsSubscription) {
      this.activatedRouteParamsSubscription.unsubscribe();
    }

    if (this.macroscopeDataServiceSubscription) {
      this.macroscopeDataServiceSubscription.unsubscribe();
    }
  }
}
