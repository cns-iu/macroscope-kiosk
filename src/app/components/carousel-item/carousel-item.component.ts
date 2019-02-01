import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  templateUrl: './carousel-item.component.html',
  styleUrls: ['./carousel-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselItemComponent {
  @Input() iterationId: number;
}
