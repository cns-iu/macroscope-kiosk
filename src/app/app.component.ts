import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { IdleDetectorService } from './shared/services/idle-detector/idle-detector.service';
import { ModalService } from './shared/services/modal-service/modal.service';
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';


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
  /**
   * Observable emitting whenever a modal is opened or closed.
   */
  readonly dialogOpened: Observable<boolean>;

  /**
   * Indicates if the app is in idle mode.
   */
  isIdle = false;

  /**
   * The number of seconds of inactivity that has to pass before
   * the interface is considered to be idle.
   */
  idleTimeout = 7 * 60;

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
    updates: SwUpdate
  ) {
    this.dialogOpened = modalService.modalOpened;

    if (updates.isEnabled) {
      updates.available.subscribe(() => {
        updates.activateUpdate().then(() => {
          document.location.reload();
        });
      });
      updates.checkForUpdate();
    }

    idleDetector.startIdleWatch(this.idleTimeout).subscribe((isIdle) => {
      // Reload the interface when coming out of the screensaver.
      // This allows new updates to be loaded immediately and
      // with little disruption.
      if (this.isIdle && !isIdle) {
        document.location.reload();
      }
      this.isIdle = isIdle;
      if (isIdle) {
        this.modalService.closeModal();
        router.navigate(['/'], {
          queryParams: { idle: 'true' },
          replaceUrl: true,
        });
        if (updates.isEnabled) {
          updates.checkForUpdate();
        }
      }
    });
  }
}
