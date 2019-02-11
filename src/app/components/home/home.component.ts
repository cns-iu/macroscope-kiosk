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
  @ViewChild(CarouselComponent) carousel: CarouselComponent;
  iterationIds: number[] = [0, 0]; // Initialization is a temporary fix for bug in carousel's looping

  private autoplayTimeout: number;
  private dataSubscription: Subscription;
  private initSubject = new Subject<void>();
  private isFirstRouteChange = true;
  private routerSubscription: Subscription;
  private updateSubject = new Subject<void>();

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dataService: MacroscopeDataService,
    private readonly modalService: DescriptionModalService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) {
    const { initSubject, updateSubject } = this;

    this.routerSubscription = rxCombineLatest(
      router.events.pipe(
        rxFilter(event => event instanceof NavigationEnd)
      ), initSubject, updateSubject
    ).subscribe(this.handleRouteChange.bind(this));
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
    this.clearAutoplayTimeout();
  }

  setUrlForActiveSlide(index: number): void {
    const { iterationIds, router } = this;
    router.navigate([iterationIds[index]], { replaceUrl: true });
  }

  openModal(dataId: string): void {
    this.modalService.handleModal({
      queryCsv: {
        database: 'ui',
        filter: [{ column: 'id', value: dataId }]
      }
    });
  }

  private startAutoplayTimeout(timeInSeconds: number): void {
    this.autoplayTimeout = setTimeout(() => {
      this.carousel.startAutoplay();
    }, timeInSeconds * 1000) as any; // NodeJS has a different return type!?!?
  }

  private clearAutoplayTimeout(): void {
    const { autoplayTimeout } = this;
    if (autoplayTimeout !== undefined) {
      clearTimeout(autoplayTimeout);
      this.autoplayTimeout = undefined;
    }
  }

  private handleRouteChange(): void {
    const { isFirstRouteChange, route } = this;
    const { firstChild: childRoute, snapshot: { queryParamMap } } = route;
    const idleParam = queryParamMap.get('idle');

    this.clearAutoplayTimeout();
    if (/^true$/i.test(idleParam)) {
      this.handleIdleRoute();
    } else if (!childRoute) {
      this.handleBaseRoute();
    } else if (isFirstRouteChange) {
      this.handleSlideRoute(childRoute);
    }

    this.isFirstRouteChange = false;
  }

  private handleIdleRoute(): void {
    this.carousel.stopAutoplay();
  }

  private handleBaseRoute(): void {
    this.carousel.slideTo(0);
    this.startAutoplayTimeout(30);
  }

  private handleSlideRoute({ snapshot: { paramMap } }: ActivatedRoute): void {
    const { carousel, iterationIds } = this;
    const id = +paramMap.get('iid');
    const index = loIndexOf(iterationIds, id);
    if (index >= 0) { carousel.slideTo(index, 0); }
  }
}
