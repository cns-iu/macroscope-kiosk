import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { IdleDetectorService } from './shared/services/idle-detector/idle-detector.service';
import { ModalService } from './shared/services/modal-service/modal.service';


/**
 * The root component of the application
 * Also initializes the idle time for screen save display.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  readonly dialogOpened: Observable<boolean>;
  isIdle = false;

  /**
   * Creates an instance of app component.
   * @param modalService The service responsible for interating with the modals
   * @param router Angular's router service
   * @param idleDetector Service that initializes and detects the idle interation time with the macroscope
   */
  constructor(
    private modalService: ModalService,
    router: Router,
    idleDetector: IdleDetectorService,
  ) {
    this.dialogOpened = modalService.modalOpened;

    idleDetector.startIdleWatch(7 * 60).pipe(
      tap(isIdle => this.isIdle = isIdle),
      filter(isIdle => isIdle)
    ).subscribe(() => {
      this.modalService.closeModal();
      router.navigate(['/'], {
        queryParams: { idle: 'true' },
        replaceUrl: true,
      });
    });
  }
}
