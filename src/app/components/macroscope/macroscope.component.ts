import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ModalService } from '../../shared/services/modal-service/modal.service';

@Component({
  selector: 'app-macroscope',
  templateUrl: './macroscope.component.html',
  styleUrls: ['./macroscope.component.scss']
})
export class MacroscopeComponent implements OnDestroy {
  iterationId: number;
  macroId: number;

  private routeParamsSubscription: Subscription;

  constructor(
    private readonly modalService: ModalService,
    route: ActivatedRoute,
  ) {
    this.routeParamsSubscription = route.paramMap.subscribe(pmap => {
      this.iterationId = +pmap.get('iid');
      this.macroId = +pmap.get('mid');
    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }

  openModal(): void {
    const { iterationId, macroId, modalService } = this;
    modalService.handleModal({
      queryCsv: {
        database: 'macroscope',
        filter: [
          { column: 'iterationId', value: iterationId },
          { column: 'macroId', value: macroId }
        ]
      }
    });
  }
}
