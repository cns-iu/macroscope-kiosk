import { Injectable } from '@angular/core';
import { Observable, Subject, timer, fromEvent, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdleDetectorService {

  private idleInterrupts: Observable<any>;
  private timer: any;
  private idleTimeoutmillis: number;
  private idleWatcher: any;
  public idleTimerExpired: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  public startIdleWatch(maxIdleTime: number): Observable<any> {
    this.idleInterrupts = merge(
      fromEvent(document, 'mosuemove'),
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
