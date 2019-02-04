import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

/* mocking screensaver component */
@Component({
  selector: 'app-screen-saver',
  template: ''
})
class MockScreenSaverComponent {
  @Input() showScreenSaver: boolean;
}


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let app: any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockScreenSaverComponent
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    app = fixture.debugElement.componentInstance;
    if (app) {
      app.isIdle = true;
    }
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('user activity should set the isIdle to false - click', () => {
    document.dispatchEvent(new Event('click'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - mousemove', () => {
    document.dispatchEvent(new Event('mousemove'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - mousedown', () => {
    document.dispatchEvent(new Event('mousedown'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - keypress', () => {
    document.dispatchEvent(new Event('keypress'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - DOMMouseScroll', () => {
    document.dispatchEvent(new Event('DOMMouseScroll'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - mousewheel', () => {
    document.dispatchEvent(new Event('mousewheel'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - touchmove', () => {
    document.dispatchEvent(new Event('touchmove'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - MSPointerMove', () => {
    document.dispatchEvent(new Event('MSPointerMove'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - window mousemove', () => {
    window.dispatchEvent(new Event('mousemove'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - window resize', () => {
    window.dispatchEvent(new Event('resize'));
    expect(app.isIdle).toEqual(false);
  });

});
