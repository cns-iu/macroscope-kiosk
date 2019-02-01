import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { indexOf, map as loMap, uniq } from 'lodash';
import { Subscription } from 'rxjs';
import { map as rxMap } from 'rxjs/operators';

import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  iterationIds: number[] = [11, 17];
  @ViewChild(CarouselComponent) carousel: CarouselComponent;

  private dataSubscription: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    dataService: MacroscopeDataService
  ) {
    this.dataSubscription = dataService.data.pipe(
      rxMap(data => loMap(data, 'iterationId')),
      rxMap(ids => uniq(ids))
    ).subscribe(ids => this.iterationIds = ids);
  }

  ngAfterViewInit(): void {
    const { carousel, route: { firstChild: childRoute } } = this;
    if (childRoute) {
      const id = +childRoute.snapshot.paramMap.get('iid');
      const index = indexOf(this.iterationIds, id);
      if (index >= 0) { carousel.slideTo(index, 0); }
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  setUrlForActiveSlide(index: number): void {
    const { iterationIds, router } = this;
    router.navigate([iterationIds[index]], { replaceUrl: true });
  }
}
