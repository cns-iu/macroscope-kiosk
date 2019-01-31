import { Component, Input } from '@angular/core';

export interface CarouselItemData {
  iterationId: number;
  macroscopeId: number;
  // TODO
}

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss']
})
export class CarouselItemComponent {
  @Input() data: CarouselItemData;
}
