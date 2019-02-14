import { Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterOutlet } from '@angular/router';
import { MockComponents, MockRender } from 'ng-mocks';
import { Subject } from 'rxjs';

import { AppComponent } from './app.component';
import { ScreenSaverComponent } from './components/screen-saver/screen-saver.component';
import { IdleDetectorService } from './shared/services/idle-detector/idle-detector.service';
import { ModalService } from './shared/services/modal-service/modal.service';

describe('AppComponent', () => {
  const mockedIdleService = { emitter: new Subject(), startIdleWatch() { return this.emitter; } };
  const mockedModalService = { closeModal: (): void => undefined };
  const mockedRouter = { navigate: (): void => undefined };
  let component: AppComponent;
  let fixture: ComponentFixture<void>;

  beforeEach(async () => {
    const mockedDeclarations: Type<any>[] = MockComponents(
      RouterOutlet,
      ScreenSaverComponent
    );
    const mockedProviders: Provider[] = [
      { provide: IdleDetectorService, useValue: mockedIdleService },
      { provide: ModalService, useValue: mockedModalService },
      { provide: Router, useValue: mockedRouter }
    ];

    TestBed.configureTestingModule({
      declarations: [AppComponent].concat(mockedDeclarations),
      providers: mockedProviders
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<app-root></app-root>`);
    component = fixture.debugElement.query(By.directive(AppComponent)).componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should update data on idle', () => {
    mockedIdleService.emitter.next(true);
    expect(component.isIdle).toBeTruthy();
  });

  it('should close modals on idle', () => {
    const spy = spyOn(TestBed.get(ModalService), 'closeModal');
    mockedIdleService.emitter.next(true);
    expect(spy).toHaveBeenCalled();
  });

  it('should navigate to root on idle', () => {
    const spy = spyOn(TestBed.get(Router), 'navigate');
    mockedIdleService.emitter.next(true);
    expect(spy).toHaveBeenCalledWith(jasmine.objectContaining(['/']), jasmine.anything());
  });
});
