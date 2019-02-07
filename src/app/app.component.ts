import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { DescriptionModalService } from './shared/services/description-modal-service/description-modal.service';
import { IdleDetectorService } from './shared/services/idle-detector/idle-detector.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'macroscope-kiosk';
  isIdle = false;

  constructor(private idleDetector: IdleDetectorService, private router: Router, private modalService: DescriptionModalService) {
    // FIXME: Temporarily setting idle timeout to 30 seconds while we test on the physical hardware before the 2.0 release.
    // idleDetector.startIdleWatch(60 * 7).subscribe((res) => {
    idleDetector.startIdleWatch(30).subscribe((res) => {
      this.isIdle = res;
      if (res) {
        /* navigate to home when screen saver appears */
        this.modalService.closeModal();
        this.router.navigateByUrl('');
      }
    });
  }
}
