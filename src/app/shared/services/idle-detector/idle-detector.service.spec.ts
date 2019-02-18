import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { IdleDetectorService } from './idle-detector.service';

describe('IdleDetectorService', () => {
  const idleTimeout = 100; // In ms
  let currentValue: boolean;
  let service: IdleDetectorService;

  // Testing utility
  function setupSubscription(): void {
    service.startIdleWatch(idleTimeout / 1000).subscribe(value => currentValue = value);
  }

  function emitClick(): void {
    document.dispatchEvent(new MouseEvent('click'));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdleDetectorService]
    });
  });

  beforeEach(() => {
    service = TestBed.get(IdleDetectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit true after timeout has passed without events', fakeAsync(() => {
    setupSubscription();
    tick(idleTimeout + 1);
    expect(currentValue).toBeTruthy();
    flush();
  }));

  it('should false after an event', fakeAsync(() => {
    setupSubscription();
    tick(idleTimeout);
    emitClick();
    tick(idleTimeout - 1);
    expect(currentValue).toBeFalsy();
    tick(2);
    flush();
  }));
});
