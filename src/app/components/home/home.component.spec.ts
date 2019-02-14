import { ChangeDetectorRef, DebugElement, EventEmitter, Predicate, Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { forEach, map, orderBy } from 'lodash';
import { MockComponents, MockRender } from 'ng-mocks';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal-service/modal.service';

import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  const defaultData = [11, 12, 13, 14];
  const mockedChangeDetector = { detectChanges: (): void => undefined };
  const mockedDataService = { data: new Subject() };
  const mockedModalService = { handleModal: (): void => undefined };
  const mockedRoute = {
    firstChild: { snapshot: { paramMap: { get: () => 14 } } },
    snapshot: { queryParamMap: { get: () => 'false' } }
  };
  const mockedRouter = { events: new Subject(), navigate: (): void => undefined };
  let carousel: CarouselComponent;
  let component: HomeComponent;
  let fixture: ComponentFixture<void>;

  // Setup utility
  function setupSpies<T, K extends keyof T>(obj: T, keys: K[]): Record<K, jasmine.Spy> {
    forEach(keys, k => obj[k] = jasmine.createSpy() as any);
    return obj as any;
  }

  function setupCarousel() {
    return setupSpies(carousel, ['slideTo', 'startAutoplay', 'stopAutoplay']);
  }

  function setupRoute(isIdle = false, childRoute?: number): void {
    const route = TestBed.get(ActivatedRoute);
    route.snapshot.queryParamMap.get = () => isIdle;
    route.firstChild = childRoute !== undefined ? {
      snapshot: { paramMap: { get: () => childRoute } }
    } : undefined;
  }

  // Event emitting utility
  async function emitData(ids = defaultData): Promise<void> {
    mockedDataService.data.next(map(ids, id => ({ iterationId: id })));
    await fixture.whenStable();
  }

  async function emitNavigation(): Promise<void> {
    mockedRouter.events.next(new NavigationEnd(0, 'hello', 'world'));
    await fixture.whenStable();
  }

  // Event listening utility
  async function triggerEvent(selector: Predicate<DebugElement>, event: string, data?: any): Promise<void> {
    const element = fixture.debugElement.query(selector);
    element.triggerEventHandler(event, data);
    fixture.detectChanges();
    await fixture.whenStable();
  }

  // Test utility
  async function testOpenModal(position: 'left' | 'right'): Promise<jasmine.Spy> {
    const { handleModal } = setupSpies(TestBed.get(ModalService), ['handleModal']);
    await triggerEvent(By.css('.text.' + position), 'click');
    return handleModal;
  }

  async function testNavigation(
    data?: number[], isIdle?: boolean, childRoute?: number
  ): Promise<ReturnType<typeof setupCarousel>> {
    const spies = setupCarousel();
    setupRoute(isIdle, childRoute);
    await emitData(data);
    await emitNavigation();
    return spies;
  }

  // Test setup
  beforeEach(async () => {
    const mockedDeclarations: Type<any>[] = [
      ...MockComponents(HeaderComponent, CarouselComponent)
    ];
    const mockedProviders: Provider[] = [
      { provide: ChangeDetectorRef, useValue: mockedChangeDetector },
      { provide: MacroscopeDataService, useValue: mockedDataService },
      { provide: ModalService, useValue: mockedModalService },
      { provide: ActivatedRoute, useValue: mockedRoute },
      { provide: Router, useValue: mockedRouter }
    ];

    TestBed.configureTestingModule({
      declarations: [HomeComponent].concat(mockedDeclarations),
      providers: mockedProviders
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<app-home></app-home>`);
    component = fixture.debugElement.query(By.directive(HomeComponent)).componentInstance;
    carousel = fixture.debugElement.query(By.directive(CarouselComponent)).componentInstance;
  });

  // Tests
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set iteration ids on data update', async () => {
    const data = [3, 2, 1];
    const sortedData = orderBy(data, undefined, 'desc');
    await emitData(data);
    expect(component.iterationIds).toEqual(sortedData);
  });

  it('should open a modal on left header text click', async () => {
    expect(await testOpenModal('left')).toHaveBeenCalled();
  });

  it('should open a modal on right header text click', async () => {
    expect(await testOpenModal('right')).toHaveBeenCalled();
  });

  it('should navigate on slide change', async () => {
    const { navigate: spy} = setupSpies(TestBed.get(Router), ['navigate']);
    const index = 1;
    const data = [12, 11];
    const expectedArgs = [
      jasmine.objectContaining([data[index]]),
      jasmine.objectContaining({ replaceUrl: true })
    ];

    await emitData(data);
    (carousel.indexChange as EventEmitter<number>).emit(index);
    expect(spy).toHaveBeenCalledWith(...expectedArgs);
  });

  it('should slide to the first slide on idle', async () => {
    const { slideTo } = await testNavigation(undefined, true);
    expect(slideTo).toHaveBeenCalledWith(0, 0);
  });

  it('should stop autoplay on idle', async () => {
    const { stopAutoplay } = await testNavigation(undefined, true);
    expect(stopAutoplay).toHaveBeenCalled();
  });

  it('should slide to the first slide on navigation to root /', async () => {
    const { slideTo } = await testNavigation();
    expect(slideTo).toHaveBeenCalledWith(0);
  });

  it('should slide to the iteration for the child url /id', async () => {
    const { slideTo } = await testNavigation([11], false, 11);
    expect(slideTo).toHaveBeenCalledWith(0, 0);
  });
});
