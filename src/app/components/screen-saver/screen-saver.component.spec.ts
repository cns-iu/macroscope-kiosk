import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ScreenSaverComponent } from './screen-saver.component';

/* mocking screensaver header component */
@Component({
  selector: 'app-screen-saver-header',
  template: ''
})
class MockScreenSaverHeaderComponent {
}

/* mocking screensaver hand pointing logo component */
@Component({
  selector: 'app-hand-pointing-logo',
  template: ''
})
class MockHandPointingLogoComponent {
}

describe('ScreenSaverComponent', () => {
  let component: ScreenSaverComponent;
  let fixture: ComponentFixture<ScreenSaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [ ScreenSaverComponent, MockScreenSaverHeaderComponent, MockHandPointingLogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSaverComponent);
    component = fixture.componentInstance;
    if (component) {
      component.showScreenSaver = true;
    }
    fixture.detectChanges();
  });

  it('should create the screen saver component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the video tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('video').length).toEqual(1);
  });

  it('it should disappear when isIdle (@Input) is set to false from AppComponent', () => {
    component.showScreenSaver = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('video').length).toEqual(1);
  });
});
