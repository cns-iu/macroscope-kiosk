import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ModalService } from '../../shared/services/modal-service/modal.service';


/**
 * Macroscope componenet responsible for displaying the header and Iframe together
 */
@Component({
  selector: 'app-macroscope',
  templateUrl: './macroscope.component.html',
  styleUrls: ['./macroscope.component.scss']
})

export class MacroscopeComponent implements OnDestroy {

  /**
   * The identifier of iteration for which we want to see the Macroscopes
   */
  iterationId: number;

  /**
   * Identifier of the Macroscope
   */
  macroId: number;


  /**
   * Holds subscription for the route parameters
   */
  private routeParamsSubscription: Subscription;


  /**
   * Creates an instance of macroscope component.
   * @param modalService The service responsible for handling operations on the modal
   * @param route Holdes the active route, which we get information like Iteration Identifier, Macroscope Identifier
   */
  constructor(
    private readonly modalService: ModalService,
    route: ActivatedRoute,
  ) {
    this.routeParamsSubscription = route.paramMap.subscribe(pmap => {
      this.iterationId = +pmap.get('iid');
      this.macroId = +pmap.get('mid');
    });
  }


  /**
   * Detaches and destroys all item components.
   */
  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }


  /**
   * Opens the modal on the macroscope
   */
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
