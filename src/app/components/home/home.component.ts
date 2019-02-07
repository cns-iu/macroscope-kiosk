import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { indexOf as loIndexOf, map as loMap, orderBy as loOrderBy, uniq as loUnique } from 'lodash';
import { Subscription } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';
import { ModalOptions } from 'src/app/shared/services/description-modal-service/modal-typings';

import { DescriptionModalService } from '../../shared/services/description-modal-service/description-modal.service';
import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  iterationIds: number[] = [0, 0]; // Initialization is a temporary fix for bug in carousel's looping
  @ViewChild(CarouselComponent) carousel: CarouselComponent;

  private dataSubscription: Subscription;

  constructor(
    public readonly modalService: DescriptionModalService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dataService: MacroscopeDataService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.dataSubscription = this.dataService.data.pipe(
      rxMap(data => loMap(data, 'iterationId')),
      rxMap(ids => loUnique(ids)),
      rxMap(ids => loOrderBy(ids, undefined, 'desc'))
    ).subscribe(ids => {
      this.iterationIds = ids;
      this.changeDetector.detectChanges();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const { carousel, route: { firstChild: childRoute } } = this;
      if (childRoute) {
        const id = +childRoute.snapshot.paramMap.get('iid');
        const index = loIndexOf(this.iterationIds, id);
        if (index >= 0) { carousel.slideTo(index, 0); }
      }
    }, 0);
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  setUrlForActiveSlide(index: number): void {
    const { iterationIds, router } = this;
    router.navigate([iterationIds[index]], { replaceUrl: true });
  }

  openModal(dataId: string) {
    const modalOptions: ModalOptions = {
      queryCsv: {
        database: 'ui',
        filter: [{ column: 'id', value: dataId }]
      }
    };
    this.modalService.handleModal(modalOptions);
  }
}
