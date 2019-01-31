import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { debounce, forEach, map } from 'lodash';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { CarouselItemComponent, CarouselItemData } from '../carousel-item/carousel-item.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() items: CarouselItemData[] = [1, 2] as any;
  @Output() indexChange: Observable<number>;
  @ViewChild(SwiperComponent) swiperComponent: SwiperComponent;

  readonly config: SwiperConfigInterface = {
    // General
    centeredSlides: true,

    // Looping
    loop: true,
    loopFillGroupWithBlank: true,

    // Observer
    observer: true,

    // Navigation
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // Pagination
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },

    // Autoplay
    autoplay: true,

    // Keyboard Control
    keyboard: true,
  };

  private readonly itemFactory: ComponentFactory<CarouselItemComponent>;
  private components: ComponentRef<CarouselItemComponent>[] = undefined;
  private indexChangeSubject = new Subject<number>();
  private swiper: any = undefined;

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly changeDetector: ChangeDetectorRef,
    private readonly element: ElementRef,
    private readonly injector: Injector,
    factoryResolver: ComponentFactoryResolver
  ) {
    this.itemFactory = factoryResolver.resolveComponentFactory(CarouselItemComponent);
    this.indexChange = this.indexChangeSubject.pipe(debounceTime(1));
  }

  ngAfterViewInit(): void {
    this.swiper = this.swiperComponent.directiveRef.swiper();
    this.reinitialize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('items' in changes && this.swiper) { this.reinitialize(); }
  }

  ngOnDestroy(): void {
    this.indexChangeSubject.complete();
    this.reinitialize.cancel();
    this.destroy();
  }

  /**
   * Transition to the item at a specific index.
   *
   * @param index The index of the item to transition to.
   * @param [speed] The duration of transitioning to the item (ms).
   */
  slideTo(index: number, speed?: number): void {
    this.swiper.slideToLoop(index, speed);
  }

  /**
   * Starts autoplay and optionally resets the carousel position to the first item.
   *
   * @param [reset=false] Whether to reset the carousel position.
   */
  startAutoplay(reset = false): void {
    if (reset) { this.slideTo(0, 0); }
    this.swiper.autoplay.start();
  }

  /**
   * Stops autoplay and optionally resets the carousel position to the first item.
   *
   * @param [reset=false] Whether to reset the carousel position.
   */
  stopAutoplay(reset = false): void {
    if (reset) { this.slideTo(0, 0); }
    this.swiper.autoplay.stop();
  }

  /**
   * Forwards a value to the `indexChange` output.
   *
   * @param index The value to forward.
   */
  forwardIndexChange(index: number): void {
    this.indexChangeSubject.next(index);
  }

  /**
   * Creates and attaches to the DOM item components for each slide including duplicates.
   */
  private initialize(): void {
    const roots = this.selectItemComponentRoots();
    this.components = map(roots, r => this.createItemComponentForRoot(r));
  }

  /**
   * Detaches and destroys all item components.
   */
  private destroy(): void {
    forEach(this.components, c => this.destroyItemComponent(c));
    this.components = undefined;
  }


  /**
   * Destroys all old item components and creates new ones with the current data.
   */
  private readonly reinitialize = debounce(function reinitializeImpl(this: CarouselComponent): void { // tslint:disable-line:member-ordering
    this.destroy();
    this.initialize();
    this.changeDetector.markForCheck();
  });

  /**
   * Selects all slide elements on which item components should be attached.
   *
   * @returns A `NodeList` with the selected elements.
   */
  private selectItemComponentRoots(): NodeListOf<HTMLElement> {
    return (this.element.nativeElement as HTMLElement).querySelectorAll('.swiper-slide');
  }

  /**
   * Creates a `CarouselItemComponent`.
   *
   * @param data The data to provide as input to the component.
   * @returns A reference to the component.
   */
  private createItemComponent(data: any): ComponentRef<CarouselItemComponent> {
    const { appRef, injector, itemFactory } = this;
    const component = itemFactory.create(injector);

    appRef.attachView(component.hostView);
    this.updateItemComponent(component, data);
    return component;
  }

  /**
   * Creates a `CarouselItemComponent` and attaches it to the DOM.
   *
   * @param root The `HTMLElement` to attach the component to.
   * @returns A reference to the component.
   */
  private createItemComponentForRoot(root: HTMLElement): ComponentRef<CarouselItemComponent> {
    // Swiper places the real (adjusted for duplicates) slide index on this attribute
    const index = +root.dataset.swiperSlideIndex;
    const component = this.createItemComponent(this.items[index]);
    const nodes = (component.hostView as EmbeddedViewRef<any>).rootNodes;

    forEach(nodes, n => root.appendChild(n));
    return component;
  }

  /**
   * Destroys a `CarouselItemComponent` including detaching it from the DOM.
   *
   * @param component The component to destroy.
   */
  private destroyItemComponent(component: ComponentRef<CarouselItemComponent>): void {
    this.appRef.detachView(component.hostView);
    component.destroy();
  }

  /**
   * Updates the data for a `CarouselItemComponent`.
   *
   * @param component The component for which to update its data.
   * @param data The new data for the item component.
   */
  private updateItemComponent(component: ComponentRef<CarouselItemComponent>, data: any): void {
    const { changeDetectorRef, instance } = component;

    instance.data = data;
    changeDetectorRef.markForCheck();
  }
}
