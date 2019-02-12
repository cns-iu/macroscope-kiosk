import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { IdleDetectorService } from './shared/services/idle-detector/idle-detector.service';
import { ModalService } from './shared/services/modal-service/modal.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly dialogOpened: Observable<boolean>;
  isIdle = false;

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
