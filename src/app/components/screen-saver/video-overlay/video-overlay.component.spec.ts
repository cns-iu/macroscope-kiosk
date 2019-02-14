import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockRender } from 'ng-mocks';
import { Subject } from 'rxjs';

import { MacroscopeDataService } from '../../../shared/services/macroscope-data/macroscope-data.service';
import { VideoOverlayComponent } from './video-overlay.component';

describe('VideoOverlayComponent', () => {
  const mockedDataService = { uiDescriptions: new Subject() };
  let component: VideoOverlayComponent;
  let fixture: ComponentFixture<void>;

  beforeEach(async () => {
    const mockedProviders: Provider[] = [
      { provide: MacroscopeDataService, useValue: mockedDataService },
    ];

    TestBed.configureTestingModule({
      declarations: [VideoOverlayComponent],
      providers: mockedProviders
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<app-video-overlay></app-video-overlay>`);
    component = fixture.debugElement.query(By.directive(VideoOverlayComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update its data from the service', () => {
    const title = 'abc';
    const subtitle = 'def';
    mockedDataService.uiDescriptions.next([{
      id: 'screensaver',
      descriptionTitle: title,
      descriptionShort: subtitle
    }]);

    expect(component.title).toEqual(title);
    expect(component.subtitle).toEqual(subtitle);
  });

  it('should set data as undefined if no item matches', () => {
    mockedDataService.uiDescriptions.next([]);
    expect(component.title).toBeUndefined();
    expect(component.subtitle).toBeUndefined();
  });
});
