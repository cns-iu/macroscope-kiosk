import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { PartialDeep } from 'lodash';
import { MockComponents } from 'ng-mocks';
import { SwiperComponent } from 'ngx-swiper-wrapper';
import Swiper from 'swiper';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';
import { CarouselComponent } from './carousel.component';

// Create a real (non-test) NgModule as a workaround for
// https://github.com/angular/angular/issues/10760
@NgModule({
  imports: [CommonModule],
  declarations: [CarouselComponent, CarouselItemComponent, MockComponents(RouterLink, SwiperComponent)],
  exports: [CarouselComponent],
  entryComponents: [CarouselItemComponent]
})
class TestModule {}

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let swiper: PartialDeep<Swiper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ imports: [TestModule] }).compileComponents();
  }));

  beforeEach(() => {
    swiper = {
      slideToLoop: jasmine.createSpy(),
      autoplay: {
        start: jasmine.createSpy(),
        stop: jasmine.createSpy(),
      },
    };
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    fixture.debugElement
      .query(By.directive(SwiperComponent))
      .componentInstance.directiveRef = { swiper: () => swiper };

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
