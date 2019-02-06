import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss']
})
export class IFrameComponent implements OnDestroy {
  activatedRouteParamsSubscription: Subscription;
  macroscopeDataServiceSubscription: Subscription;
  activeMacroscopeData: any;
  macroscopeUrl: SafeResourceUrl;

  constructor(
    private readonly macroscopeDataService: MacroscopeDataService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sanitize: DomSanitizer
  ) {
    this.macroscopeDataServiceSubscription = this.macroscopeDataService.data.subscribe((data: any) => {
      this.updateMacroscope(data);
    });
  }

  updateMacroscope(data: any) {
    this.activatedRouteParamsSubscription = this.activatedRoute.params.subscribe((params) => {
      const iterationId = params['iid'];
      const macroId = params['mid'];
      const activeMacroscopeData = data.filter((row: any) => {
        return row['iterationId'] === parseInt(iterationId, 10) && row['macroId'] === parseInt(macroId, 10);
      });
      if (activeMacroscopeData && activeMacroscopeData.length > 0) {
        this.macroscopeUrl = this.sanitize.bypassSecurityTrustResourceUrl(activeMacroscopeData[0]['url']);
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
