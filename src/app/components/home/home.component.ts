import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { indexOf as loIndexOf, map as loMap, orderBy as loOrderBy, uniq as loUnique } from 'lodash';
import { combineLatest as rxCombineLatest, Subject, Subscription } from 'rxjs';
import { filter as rxFilter, map as rxMap } from 'rxjs/operators';

import { DescriptionModalService } from '../../shared/services/description-modal-service/description-modal.service';
import { ModalOptions } from '../../shared/services/description-modal-service/modal-typings';
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

  private initSubject = new Subject<void>();
  private updateSubject = new Subject<void>();
  private dataSubscription: Subscription;
  private routerSubscription: Subscription;
  private autoplayStarter: number;

  constructor(
    public readonly modalService: DescriptionModalService,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dataService: MacroscopeDataService,
    private readonly router: Router,
    route: ActivatedRoute
  ) {
    const { initSubject, updateSubject } = this;
    let isFirst = true;

    this.routerSubscription = rxCombineLatest(
      router.events.pipe(
        rxFilter(event => event instanceof NavigationEnd)
      ), initSubject, updateSubject
    ).pipe(rxMap(items => items[0])).subscribe(() => {
      const { autoplayStarter, carousel, iterationIds } = this;
      const { firstChild: childRoute } = route;

      if (autoplayStarter !== undefined) {
        clearTimeout(autoplayStarter);
        this.autoplayStarter = undefined;
      }

      if (/true/i.test(route.snapshot.queryParamMap.get('idle'))) {
        carousel.stopAutoplay();
      } else if (!childRoute) {
        carousel.slideTo(0);
        this.autoplayStarter = setTimeout(() => carousel.startAutoplay(), 30 * 1000) as any; // NodeJS has a different return type!?!?
      } else if (isFirst) {
        const id = +childRoute.snapshot.paramMap.get('iid');
        const index = loIndexOf(iterationIds, id);
        if (index >= 0) { carousel.slideTo(index, 0); }
      }

      isFirst = false;
    });
  }

  ngOnInit() {
    this.dataSubscription = this.dataService.data.pipe(
      rxMap(data => loMap(data, 'iterationId')),
      rxMap(ids => loUnique(ids)),
      rxMap(ids => loOrderBy(ids, undefined, 'desc'))
    ).subscribe(ids => {
      this.iterationIds = ids;
      this.updateSubject.next();
      this.changeDetector.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.initSubject.next();
    this.initSubject.complete();
  }

  ngOnDestroy() {
    this.updateSubject.complete();
    this.dataSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();

    if (this.autoplayStarter !== undefined) {
      clearTimeout(this.autoplayStarter);
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
