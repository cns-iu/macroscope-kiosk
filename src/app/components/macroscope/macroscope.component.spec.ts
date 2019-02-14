import { Provider } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MockComponents, MockRender } from 'ng-mocks';
import { Subject } from 'rxjs';
import { ModalService } from 'src/app/shared/services/modal-service/modal.service';

import { HeaderComponent } from '../header/header.component';
import { IFrameComponent } from '../iframe/iframe.component';
import { MacroscopeComponent } from './macroscope.component';

describe('MacroscopeComponent', () => {
  const mockedModalService = { handleModal: (): void => undefined };
  const mockedRoute = { paramMap: new Subject() };
  let component: MacroscopeComponent;
  let fixture: ComponentFixture<void>;

  beforeEach(async(() => {
    const mockedProviders: Provider[] = [
      { provide: ModalService, useValue: mockedModalService },
      { provide: ActivatedRoute, useValue: mockedRoute }
    ];

    TestBed.configureTestingModule({
      declarations: [MacroscopeComponent, MockComponents(HeaderComponent, IFrameComponent, RouterLink)],
      providers: mockedProviders
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = MockRender(`<app-macroscope></app-macroscope>`);
    component = fixture.debugElement.query(By.directive(MacroscopeComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data on navigation', fakeAsync(() => {
    mockedRoute.paramMap.next({
      get: (key: string) => key === 'iid' ? 1 : 2
    });
    expect(component.iterationId).toEqual(1);
    expect(component.macroId).toEqual(2);
  }));

  it('should open a modal on click', () => {
    const spy = spyOn(TestBed.get(ModalService), 'handleModal');
    const element = fixture.debugElement.query(By.css('.about-macroscope'));
    element.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
  });
});
