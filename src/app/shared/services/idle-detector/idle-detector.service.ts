import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, Subject, timer, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleDetectorService {
  private idleInterrupts: Observable<any>;
  public idleTimerExpired = new Subject<boolean>();
  private idleTimeoutmillis: number;
  private idleWatcher: Subscription;
  private timer: Subscription;

  constructor() { }

  public startIdleWatch(maxIdleTime: number): Subject<boolean> {
    this.idleInterrupts = merge(
      fromEvent(document, 'mousemove'),
      fromEvent(document, 'click'),
      fromEvent(document, 'mousedown'),
      fromEvent(document, 'keypress'),
      fromEvent(document, 'DOMMouseScroll'),
      fromEvent(document, 'mousewheel'),
      fromEvent(document, 'touchmove'),
      fromEvent(document, 'MSPointerMove'),
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'resize'),
    );

    this.idleTimeoutmillis = maxIdleTime * 1000;

    this.idleWatcher = this.idleInterrupts.subscribe((res) => {
      this.idleTimerExpired.next(false);
      this.resetIdleTimer();
    });

    this.startIdleTimer();

    return this.idleTimerExpired;
  }

  private startIdleTimer() {
    this.timer = timer(this.idleTimeoutmillis, this.idleTimeoutmillis).subscribe((res) => {
       this.idleTimerExpired.next(true);
     });
  }

  public resetIdleTimer() {
    this.timer.unsubscribe();
    this.startIdleTimer();
  }

  public stopIdleTimer() {
    this.timer.unsubscribe();
    this.idleWatcher.unsubscribe();
  }
}
