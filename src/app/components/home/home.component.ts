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

import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { ModalService } from '../../shared/services/modal-service/modal.service';
import { CarouselComponent } from '../carousel/carousel.component';


/**
 * Home compononent declaration, responsible for holding the carousel and header.
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Reference to the Carousel Component
   */
  @ViewChild(CarouselComponent) carousel: CarouselComponent;


  /**
   * Iteration ids of home component
   */
  iterationIds: number[] = [0, 0]; // Initialization is a temporary fix for bug in carousel's looping


  /**
   * Time in seconds after which we statr showing the screen saver
   */
  private autoplayTimeout: number;

  /**
   * Data subscription of home component, responsible for getting the CSV data
   */
  private dataSubscription: Subscription;
  private initSubject = new Subject<void>();
  private isFirstRouteChange = true;

  /**
   * Router subscription of home component, holds the router subscription
   */
  private routerSubscription: Subscription;
  private updateSubject = new Subject<void>();


  /**
   * Creates an instance of home component.
   * @param changeDetector Base class for Angular Views, provides change detection functionality.
   * @param dataService Reference for the data service which is reponsible for parsing the CSV
   * @param modalService Service for the modal, responsible for interating with the modal
   * @param route Holds the active route information, mostly used to get the params.
   * @param router Hols the Angular Router
   */
  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dataService: MacroscopeDataService,
    private readonly modalService: ModalService,
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

  /**
   * Angular lifecycle event, can be used for initializations
   */
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


  /**
   * Angular event, called for view initialization
   */
  ngAfterViewInit() {
    this.initSubject.next();
    this.initSubject.complete();
  }


  /**
   * on destroy: Angular lifecycle event, all clean up tasks should be done here
   */
  ngOnDestroy() {
    this.updateSubject.complete();
    this.dataSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    this.clearAutoplayTimeout();
  }


  /**
   * Sets url for active slide, this is done to change the url when the carousel animation changes
   * @param index index of the current carousel state
   */
  setUrlForActiveSlide(index: number): void {
    const { iterationIds, router } = this;
    router.navigate([iterationIds[index]], { replaceUrl: true });
  }


  /**
   * Responsible for the oopening the modal
   * @param dataId Unique identifier for the row in the CSV
   */
  openModal(dataId: string): void {
    this.modalService.handleModal({
      queryCsv: {
        database: 'ui',
        filter: [{ column: 'id', value: dataId }]
      }
    });
  }


  /**
   * Starts autoplay timeout for the screensaver
   * @param timeInSeconds The time after which we want the carousel to start animation
   */
  private startAutoplayTimeout(timeInSeconds: number): void {
    this.autoplayTimeout = setTimeout(() => {
      this.carousel.startAutoplay();
    }, timeInSeconds * 1000) as any; // NodeJS has a different return type!?!?
  }


  /**
   * Clears autoplay timeout for carousel
   */
  private clearAutoplayTimeout(): void {
    const { autoplayTimeout } = this;
    if (autoplayTimeout !== undefined) {
      clearTimeout(autoplayTimeout);
      this.autoplayTimeout = undefined;
    }
  }


  /**
   * Handles the route change
   */
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
    this.carousel.slideTo(0, 0);
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
