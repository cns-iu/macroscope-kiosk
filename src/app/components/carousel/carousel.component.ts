import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { debounce, forEach, map } from 'lodash';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import Swiper from 'swiper';

import { CarouselItemComponent } from '../carousel-item/carousel-item.component';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() ids: number[];
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
      prevEl: '.previous-button',
      nextEl: '.next-button',
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
  private swiper: Swiper = undefined;

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly element: ElementRef,
    private readonly viewContainer: ViewContainerRef,
    factoryResolver: ComponentFactoryResolver
  ) {
    this.itemFactory = factoryResolver.resolveComponentFactory(CarouselItemComponent);
    this.indexChange = this.indexChangeSubject.pipe(distinctUntilChanged());
  }

  ngAfterViewInit() {
    this.swiper = this.swiperComponent.directiveRef.swiper();
    this.reinitialize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('ids' in changes && this.swiper) {
      this.reinitialize();
    }
  }

  ngOnDestroy() {
    this.indexChangeSubject.complete();
    this.reinitialize.cancel();
    this.destroy();
  }

  indexChanged(): void {
    const { indexChangeSubject, swiper: { activeIndex, slides } } = this;
    const element: HTMLElement = slides[activeIndex];
    const index = +element.dataset.index;
    indexChangeSubject.next(index);
  }

  /**
   * Transition to the item at a specific index.
   *
   * @param index The index of the item to transition to.
   * @param [speed] The duration of transitioning to the item (ms).
   */
  slideTo(index: number, speed?: number): void {
    this.stopAutoplay();
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
    this.changeDetector.detectChanges();
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
    const { itemFactory, viewContainer } = this;
    const component = viewContainer.createComponent(itemFactory);

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
    const index = +root.dataset.index;
    const component = this.createItemComponent(this.ids[index]);
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
    const { viewContainer } = this;

    viewContainer.remove(viewContainer.indexOf(component.hostView));
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

    instance.iterationId = data;
    changeDetectorRef.detectChanges();
  }
}
