import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DescriptionModalService } from 'src/app/shared/services/description-modal-service/description-modal.service';
import { ModalOptions } from 'src/app/shared/services/description-modal-service/modal-typings';

@Component({
  selector: 'app-macroscope',
  templateUrl: './macroscope.component.html',
  styleUrls: ['./macroscope.component.scss']
})
export class MacroscopeComponent {

  iid: string;
  mid: string;

  constructor(private readonly location: Location,
    private activeRoute: ActivatedRoute,
    private modalService: DescriptionModalService
  ) {
    this.activeRoute.params.subscribe(params => {
      this.iid = params['iid'];
      this.mid = params['mid'];
    });
  }

  backClick(): void { this.location.back(); }

  openModal() {
    const modalOptions: ModalOptions = {
      queryCsv: {
        database: 'macroscope',
        filter: [{ column: 'iterationId', value: Number(this.iid) }, { column: 'macroId', value: Number(this.mid) }]
      }
    };
    this.modalService.handleModal(modalOptions);
  }
}
