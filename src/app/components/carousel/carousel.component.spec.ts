import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, NgModule, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { constant as loConstant, PartialDeep } from 'lodash';
import { MockComponent, MockRender } from 'ng-mocks';
import { SwiperComponent } from 'ngx-swiper-wrapper';
import Swiper from 'swiper';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { CarouselComponent } from './carousel.component';


// Can't use ng-mocks' `MockComponent` since directiveRef needs to exist on the component.
@Component({
  selector: 'swiper', // tslint:disable-line:component-selector
  template: `<ng-content></ng-content>`,
  providers: [{ provide: SwiperComponent, useExisting: forwardRef(() => SwiperMockComponent) }]
})
class SwiperMockComponent {
  @Input() config: any;
  @Output() indexChange = new EventEmitter();

  directiveRef = {
    swiper: loConstant({
      slideToLoop: (): void => undefined,
      autoplay: {
        start: (): void => undefined,
        stop: (): void => undefined,
      },

      activeIndex: 2,
      slides: [
        { dataset: { index: 0 } },
        { dataset: { index: 1 } },
        { dataset: { index: 0 } } // Simulated duplicate
      ]
    })
  };
}

// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
@NgModule({
  imports: [CommonModule],
  declarations: [CarouselComponent, CarouselItemComponent, SwiperMockComponent, MockComponent(RouterLink)],
  exports: [CarouselComponent],
  entryComponents: [CarouselItemComponent]
})
class TestModule {}

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let hostComponent: { ids: number[], listener: jasmine.Spy };
  let fixture: ComponentFixture<{ ids: number[], listener: jasmine.Spy }>;
  let swiper: PartialDeep<Swiper>;
  let swiperComponent: SwiperMockComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule, MatDialogModule],
      providers: [ChangeDetectorRef, MatDialog]
    });
  });

  beforeEach(() => {
    fixture = MockRender(
      `<app-carousel [ids]="ids" (indexChange)="listener($event)"></app-carousel>`,
      { ids: [1, 2], listener: jasmine.createSpy() }
    );
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(CarouselComponent)).componentInstance;
    swiperComponent = fixture.debugElement.query(By.directive(SwiperComponent)).componentInstance;
    swiper = swiperComponent.directiveRef.swiper() as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update when ids are changed', async () => {
    const spy = spyOn(component as any, 'reinitialize').and.callThrough();
    hostComponent.ids = [5, 10];
    fixture.detectChanges();
    await fixture.whenStable();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should forward index changes from swiper', () => {
    swiperComponent.indexChange.emit();
    expect(hostComponent.listener).toHaveBeenCalledWith(0);
  });

  it('should call swiper.slideToLoop(index, speed) on slideTo(index, speed)', () => {
    const spy = spyOn(swiper, 'slideToLoop');
    component.slideTo(2, 100);
    expect(spy).toHaveBeenCalledWith(2, 100);
  });

  it('should call swiper.autoplay.start() on startAutoplay()', () => {
    const spy = spyOn(swiper.autoplay, 'start');
    component.startAutoplay();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call swiper.autoplay.start() and carousel.slideTo(0, 0) on startAutoplay(true)', () => {
    const spy1 = spyOn(swiper.autoplay, 'start');
    const spy2 = spyOn(component, 'slideTo');
    component.startAutoplay(true);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(0, 0);
  });

  it('should call swiper.autoplay.stop() on stopAutoplay()', () => {
    const spy = spyOn(swiper.autoplay, 'stop');
    component.stopAutoplay();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call swiper.autoplay.stop() and carousel.slideTo(0, 0) on stopAutoplay(true)', () => {
    const spy1 = spyOn(swiper.autoplay, 'stop');
    const spy2 = spyOn(component, 'slideTo');
    component.stopAutoplay(true);
    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(0, 0);
  });
});
