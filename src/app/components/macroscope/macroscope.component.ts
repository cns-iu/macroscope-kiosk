import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { DescriptionModalService } from '../../shared/services/description-modal-service/description-modal.service';
import { ModalOptions } from '../../shared/services/description-modal-service/modal-typings';

@Component({
  selector: 'app-macroscope',
  templateUrl: './macroscope.component.html',
  styleUrls: ['./macroscope.component.scss']
})
export class MacroscopeComponent implements OnDestroy {
  iid: string;
  mid: string;
  private routeParamsSubscription: Subscription;

  ngOnDestroy() {
    if (this.routeParamsSubscription) {
      this.routeParamsSubscription.unsubscribe();
    }
  }

  constructor(private readonly activeRoute: ActivatedRoute, private readonly modalService: DescriptionModalService) {
    this.routeParamsSubscription = this.activeRoute.params.subscribe(params => {
      this.iid = params['iid'];
      this.mid = params['mid'];
    });
  }

  openModal(): void {
    const modalOptions: ModalOptions = {
      queryCsv: {
        database: 'macroscope',
        filter: [{ column: 'iterationId', value: Number(this.iid) }, { column: 'macroId', value: Number(this.mid) }]
      }
    };
    this.modalService.handleModal(modalOptions);
  }
}
