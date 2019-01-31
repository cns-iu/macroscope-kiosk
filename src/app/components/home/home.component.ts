import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CarouselItemData } from '../carousel-item/carousel-item.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  items: CarouselItemData[] = [];

  constructor(private readonly router: Router) { }

  setUrlForActiveSlide(index: number): void {
    const { items, router } = this;
    const { iterationId } = items[index];
    router.navigate([iterationId], { replaceUrl: true });
  }
}
