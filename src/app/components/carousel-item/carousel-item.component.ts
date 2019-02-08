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
import { DescriptionModalService } from '../../shared/services/description-modal-service/description-modal.service';
import { ModalOptions } from '../../shared/services/description-modal-service/modal-typings';
import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselItemComponent implements OnInit, OnChanges, OnDestroy {
  @Input() iterationId: number;
  macroscopes: MacroscopeData[] = [];
  get itemWidth(): string { return `${100 / this.macroscopes.length}%`; }
  private iterationIdSubject = new Subject<number>();
  private dataSubscription: Subscription;

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly dataService: MacroscopeDataService,
    public modalService: DescriptionModalService
  ) { }

  ngOnInit() {
    const { changeDetector, dataService: { data }, iterationIdSubject } = this;
    this.dataSubscription = combineLatest(iterationIdSubject, data).pipe(
      rxMap(([id, iterations]) => loFilter(iterations, ['iterationId', id])),
      rxMap(macroscopes => loOrderBy(macroscopes, 'macroId'))
    ).subscribe(macroscopes => {
      this.macroscopes = macroscopes;
      changeDetector.detectChanges();
    });

    this.updateIterationId();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('iterationId' in changes) { this.updateIterationId(); }
  }

  ngOnDestroy() {
    if (this.iterationIdSubject) {
      this.iterationIdSubject.complete();
    }

    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  getLink({ macroId }: MacroscopeData): string {
    return `/${this.iterationId}/${macroId}`;
  }

  getImageUrl({ logo }: MacroscopeData): string {
    return `url('assets/macroscope-logos/iteration-${this.iterationId}/${logo}')`;
  }

  private updateIterationId(): void {
    this.iterationIdSubject.next(this.iterationId);
  }

  openModal(macroscopeData: MacroscopeData) {
    const modalOptions: ModalOptions = {
      data: macroscopeData
    };
    this.modalService.handleModal(modalOptions);
  }
}
