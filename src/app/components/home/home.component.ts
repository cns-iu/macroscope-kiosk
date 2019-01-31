import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'lodash';

import { CarouselItemData } from '../carousel-item/carousel-item.component';
import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {
  items: CarouselItemData[] = [{ iterationId: 11, macroscopeId: 0}, { iterationId: 17, macroscopeId: 5}];
  @ViewChild(CarouselComponent) carousel: CarouselComponent;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngAfterViewInit(): void {
    const { carousel, route: { firstChild: childRoute } } = this;
    if (childRoute) {
      const id = +childRoute.snapshot.paramMap.get('iid');
      const index = findIndex(this.items, ['iterationId', id]);
      if (index >= 0) { carousel.slideTo(index, 0); }
    }
  }

  setUrlForActiveSlide(index: number): void {
    const { items, router } = this;
    const { iterationId } = items[index];
    router.navigate([iterationId], { replaceUrl: true });
  }
}
