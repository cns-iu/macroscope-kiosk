import { DebugElement, Predicate, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'lodash';
import { MockModule, MockRender } from 'ng-mocks';
import { Subject } from 'rxjs';
import { VgBufferingModule } from 'videogular2/compiled/buffering';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgCoreModule } from 'videogular2/compiled/core';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';

import { mock as SafePipeMock, spy as safePipeSpy } from '../../shared/safe-pipe/safe.pipe.mock';
import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { IFrameComponent } from './iframe.component';

describe('IFrameComponent', () => {
  const mockedDataService = { data: new Subject() };
  const mockedRoute = { paramMap: new Subject() };
  let component: IFrameComponent;
  let fixture: ComponentFixture<void>;

  async function emitDataAndRoute(url = 'default.url', isVideo = false): Promise<void> {
    const iterationId = 14;
    const macroId = 1;
    const item = { iterationId, macroId, url, type: isVideo ? 'video' : 'macroscope' };
    const pmap = { get: (key: string) => key === 'iid' ? iterationId : macroId };

    mockedDataService.data.next([item]);
    mockedRoute.paramMap.next(pmap);
    await fixture.whenStable();
  }

  async function emitDataAndRouteThenQuery(
    query: Predicate<DebugElement>, url?: string, isVideo?: boolean
  ): Promise<DebugElement> {
    await emitDataAndRoute(url, isVideo);
    fixture.detectChanges();
    await fixture.whenRenderingDone();

    return fixture.debugElement.query(query);
  }

  beforeEach(() => {
    // Reset pipe spies
    safePipeSpy.calls.reset();
  });

  beforeEach(async () => {
    const mockedImports = map([
      VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule
    ], (m) => MockModule(m));
    const mockedDeclarations: Type<any>[] = [
      SafePipeMock
    ];
    const mockedProviders: Provider[] = [
      { provide: MacroscopeDataService, useValue: mockedDataService },
      { provide: ActivatedRoute, useValue: mockedRoute }
    ];

    TestBed.configureTestingModule({
      imports: mockedImports,
      declarations: [IFrameComponent].concat(mockedDeclarations),
      providers: mockedProviders
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<app-iframe></app-iframe>`);
    component = fixture.debugElement.query(By.directive(IFrameComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the url from the data', async () => {
    const url = 'https://fake.url';
    await emitDataAndRoute(url);
    expect(component.macroscopeUrl).toEqual(url);
  });

  it('should set isVideo from the data', async () => {
    await emitDataAndRoute(undefined, true);
    expect(component.isVideo).toBeTruthy();
  });

  it('should contain iframe when isVideo === false', async () => {
    const iframe = await emitDataAndRouteThenQuery(By.css('.iframe'));
    expect(iframe).toBeTruthy();
  });

  it('should not contain iframe when isVideo === true', async () => {
    const iframe = await emitDataAndRouteThenQuery(By.css('.iframe'), undefined, true);
    expect(iframe).toBeFalsy();
  });

  it('should not contain video when isVideo === false', async () => {
    const video = await emitDataAndRouteThenQuery(By.css('.video'));
    expect(video).toBeFalsy();
  });

  it('should contain video when isVideo === true', async () => {
    const video = await emitDataAndRouteThenQuery(By.css('.video'), undefined, true);
    expect(video).toBeTruthy();
  });

  it('should pass the url through SafePipe', async () => {
    const url = 'https://fake.url';
    await emitDataAndRouteThenQuery(By.css('.iframe'), url);

    expect(safePipeSpy).toHaveBeenCalledWith(url, jasmine.anything());
  });
});
