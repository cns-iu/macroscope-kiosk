import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-macroscope',
  templateUrl: './macroscope.component.html',
  styleUrls: ['./macroscope.component.scss']
})
export class MacroscopeComponent implements OnDestroy {
  iterationId: number;
  private iterationIdSubscription: Subscription;

  constructor(route: ActivatedRoute) {
    this.iterationIdSubscription = route.paramMap.subscribe(pmap => {
      this.iterationId = +pmap.get('iid');
    });
  }

  ngOnDestroy() {
    this.iterationIdSubscription.unsubscribe();
  }
}
