import { Component, Input } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
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

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('user activity should set the isIdle to false - click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    document.dispatchEvent(new Event('click'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - mousemove', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    document.dispatchEvent(new Event('mousemove'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - mousedown', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    document.dispatchEvent(new Event('mousedown'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - keypress', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    document.dispatchEvent(new Event('keypress'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - DOMMouseScroll', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    document.dispatchEvent(new Event('DOMMouseScroll'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - mousewheel', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    document.dispatchEvent(new Event('mousewheel'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - touchmove', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    document.dispatchEvent(new Event('touchmove'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - MSPointerMove', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    document.dispatchEvent(new Event('MSPointerMove'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - window mousemove', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    window.dispatchEvent(new Event('mousemove'));
    expect(app.isIdle).toEqual(false);
  });

  it('user activity should set the isIdle to false - window resize', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.isIdle = true;
    window.dispatchEvent(new Event('resize'));
    expect(app.isIdle).toEqual(false);
  });

});
