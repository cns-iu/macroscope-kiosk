import { Component } from '@angular/core';

import { IdleDetectorService } from './shared/services/idle-detector/idle-detector.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'macroscope-kiosk';
  isIdle = false;

  constructor(private idleDetector: IdleDetectorService) {
    idleDetector.startIdleWatch(60 * 7).subscribe((res) => {
      this.isIdle = res;
    });
  }
}
