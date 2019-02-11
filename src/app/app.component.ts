import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { distinctUntilChanged, tap } from 'rxjs/operators';

import { DescriptionModalService } from './shared/services/description-modal-service/description-modal.service';
import { IdleDetectorService } from './shared/services/idle-detector/idle-detector.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly dialogOpened: Observable<boolean>;
  isIdle = false;

  constructor(
    private modalService: DescriptionModalService,
    router: Router,
    idleDetector: IdleDetectorService,
  ) {
    this.dialogOpened = modalService.dialogOpened;

    idleDetector.startIdleWatch(7 * 60).pipe(
      tap(isIdle => this.isIdle = isIdle),
      distinctUntilChanged()
    ).subscribe((isIdle) => {
      if (isIdle) {
        this.modalService.closeDialog();
        router.navigate(['/'], {
          queryParams: { idle: 'true' },
          replaceUrl: true,
        });
      }
    });
  }
}
