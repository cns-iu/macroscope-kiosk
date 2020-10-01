import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, share, throttleTime } from 'rxjs/operators';


/**
 * The service that detects for how long Macroscope has not been interated by user
 */
@Injectable({
  providedIn: 'root'
})
/**
 * The service that detects for how long Macroscope has not been interacted by user
 */
export class IdleDetectorService {

  /**
   * Declaration of the events that should close the screensave. Using only 'Click' event
   */
  private readonly eventSources = merge(
    fromEvent(document, 'click'),
    fromEvent(document, 'mousemove'),
    fromEvent(document, 'touchmove'),
    // fromEvent(document, 'mousedown'),
    // fromEvent(document, 'keypress'),
    // fromEvent(document, 'DOMMouseScroll'),
    // fromEvent(document, 'mousewheel'),
    // fromEvent(document, 'touchmove'),
    // fromEvent(document, 'MSPointerMove'),
    // fromEvent(document, 'touchstart'),
    // fromEvent(document, 'touchend'),
    // fromEvent(window, 'mousemove'),
    // fromEvent(window, 'resize'),
  );


  /**
   * Observable that gets triggered when the provided idle time is over.
   * This is subscibed to show screen saver after given time.
   * @param maxIdleTime Idle time afte which screen save should be shown
   * @returns Observable that determines if the screen saver should start showing up, it starts after the Macroscope is idle for set time
   */
  public startIdleWatch(maxIdleTime: number): Observable<boolean> {
    const shared = merge(of('fake-event'), this.eventSources).pipe(share());
    const startIdle = shared.pipe(debounceTime(maxIdleTime * 1000), map(() => true));
    const stopIdle = shared.pipe(throttleTime(50), map(() => false));
    return merge(startIdle, stopIdle).pipe(distinctUntilChanged());
  }
}
