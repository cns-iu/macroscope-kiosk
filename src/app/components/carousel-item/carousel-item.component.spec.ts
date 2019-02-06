import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { MockDirective, MockRender } from 'ng-mocks';
import { of } from 'rxjs';
import { MacroscopeData } from 'src/app/shared/csv-typings';
import { MacroscopeDataService } from 'src/app/shared/services/macroscope-data/macroscope-data.service';

import { CarouselItemComponent } from './carousel-item.component';

describe('CarouselItemComponent', () => {
  const iteration1 = [
    { iterationId: 1, macroId: 1, title: 'foo', subtitle: 'bar' },
    { iterationId: 1, macroId: 2, title: 'qwerty', subtitle: 'zxcv' }
  ] as MacroscopeData[];
  const iteration2 = [
    { iterationId: 2, macroId: 1, title: 'abcdef', subtitle: '123456' }
  ] as MacroscopeData[];
  const mockData = [...iteration1, ...iteration2];

  let component: CarouselItemComponent;
  let fixture: ComponentFixture<{ id: number }>;
  let hostComponent: { id: number };
  let imageUrlOriginal: (this: CarouselItemComponent, data: MacroscopeData) => string;
  let imageUrlSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselItemComponent, MockDirective(RouterLink)],
      providers: [
        ChangeDetectorRef,
        { provide: MacroscopeDataService, useValue: { data: of(mockData) } }
      ]
    });
  });

  beforeEach(() => {
    fixture = MockRender(`<app-carousel-item [iterationId]="id"></app-carousel-item>`, { id: 1 });
    hostComponent = fixture.componentInstance;
    component = fixture.debugElement.query(By.directive(CarouselItemComponent)).componentInstance;

    // Prevents fetching of background images
    imageUrlOriginal = component.getImageUrl;
    imageUrlSpy = spyOn(component, 'getImageUrl').and.returnValue(undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get macroscope data for the iteration', () => {
    expect(component.macroscopes).toEqual(iteration1);
  });

  it('should update macroscope data when iteration id is updated', async () => {
    hostComponent.id = 2;
    fixture.detectChanges();
    await fixture.whenStable();
    expect(component.macroscopes).toEqual(iteration2);
  });

  it('should have a title', () => {
    const header = fixture.debugElement.query(By.css('.header'));
    const title = header.nativeElement.textContent as string;
    const expectedTitle = iteration1[0].title;
    expect(title).toEqual(expectedTitle);
  });

  it('should have a subtitle', () => {
    const text = fixture.debugElement.query(By.css('.text'));
    const subtitle = text.nativeElement.textContent as string;
    const expectedSubtitle = iteration1[0].subtitle;
    expect(subtitle).toEqual(expectedSubtitle);
  });
});
