import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { filter as loFilter, orderBy as loOrderBy } from 'lodash';
import { combineLatest, Subject, Subscription } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';

import { MacroscopeData } from '../../shared/csv-typings';
import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { ModalService } from '../../shared/services/modal-service/modal.service';

/**
 * Component responsible for rendering a group of macroscope references.
 */
@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselItemComponent implements OnInit, OnChanges, OnDestroy {
  /**
   * Iteration id of managed macroscopes.
   */
  @Input() iterationId: number;

  /**
   * Data for each macroscope.
   */
  macroscopes: MacroscopeData[] = [];

  /**
   * Gets the percentage width of each macroscope item.
   */
  get itemWidth(): string { return `${100 / this.macroscopes.length}%`; }

  /**
   * Event emitter used to update iteration id.
   */
  private iterationIdSubject = new Subject<number>();

  /**
   * Subscription for data observable.
   */
  private dataSubscription: Subscription;

  /**
   * Creates an instance of carousel item component.
   * @param changeDetector The `ChangeDetectorRef` associated with this instance.
   * @param dataService Service from which macroscope data is fetched.
   * @param modalService Service to open new modal windows.
   */
  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dataService: MacroscopeDataService,
    public modalService: ModalService
  ) { }

  /**
   * On initialization lifecycle hook.
   * Initializes data observation.
   */
  ngOnInit() {
    const { changeDetector, dataService: { data }, iterationIdSubject } = this;
    this.dataSubscription = combineLatest([iterationIdSubject, data]).pipe(
      rxMap(([id, iterations]) => loFilter(iterations, ['iterationId', id])),
      rxMap(macroscopes => loOrderBy(macroscopes, 'macroId'))
    ).subscribe(macroscopes => {
      this.macroscopes = macroscopes;
      changeDetector.detectChanges();
    });

    this.updateIterationId();
  }

  /**
   * On changes lifecycle hook.
   * Detects changes to `iterationId`.
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('iterationId' in changes) { this.updateIterationId(); }
  }

  /**
   * On destroy lifecycle hook.
   * Cleans up observables and subscriptions.
   */
  ngOnDestroy() {
    this.iterationIdSubject.complete();
    this.dataSubscription.unsubscribe();
  }

  /**
   * Computes the url for a specified macroscope.
   * @param macroId The macroscope identifier.
   * @returns link A string containing the url.
   */
  getLink({ macroId }: MacroscopeData): string {
    return `/${this.iterationId}/${macroId}`;
  }

  /**
   * Gets the preview/logo url for the specified macroscope.
   * @param logo The name of the logo file.
   * @returns image A string containing the url.
   */
  getImageUrl({ logo }: MacroscopeData): string {
    return `url('assets/macroscope-logos/iteration-${this.iterationId}/${logo}')`;
  }

  /**
   * Opens a modal describing the specified macroscope.
   * @param macroscopeData The data associated with the macroscope.
   */
  openModal(macroscopeData: MacroscopeData): void {
    this.modalService.handleModal({ data: macroscopeData });
  }

  /**
   * Sends updates with the new `iterationId`.
   */
  private updateIterationId(): void {
    this.iterationIdSubject.next(this.iterationId);
  }
}
