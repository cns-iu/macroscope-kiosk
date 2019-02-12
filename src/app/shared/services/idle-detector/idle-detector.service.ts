import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, share, throttleTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IdleDetectorService {
  private readonly eventSources = merge(
    fromEvent(document, 'click'),
    // fromEvent(document, 'mousemove'),
    // fromEvent(document, 'touchmove'),
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

  public startIdleWatch(maxIdleTime: number): Observable<boolean> {
    const shared = merge(of('fake-event'), this.eventSources).pipe(share());
    const startIdle = shared.pipe(debounceTime(maxIdleTime * 1000), map(() => true));
    const stopIdle = shared.pipe(throttleTime(50), map(() => false));
    return merge(startIdle, stopIdle).pipe(distinctUntilChanged());
  }
}
