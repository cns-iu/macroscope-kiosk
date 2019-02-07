import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponents } from 'ng-mocks';

import { HandPointingLogoComponent } from './icons/hand-pointing-logo/hand-pointing-logo.component';
import { ScreenSaverHeaderComponent } from './screen-saver-header/screen-saver-header.component';
import { ScreenSaverComponent } from './screen-saver.component';

describe('ScreenSaverComponent', () => {
  let component: ScreenSaverComponent;
  let fixture: ComponentFixture<ScreenSaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: [ ScreenSaverComponent, MockComponents(ScreenSaverHeaderComponent, HandPointingLogoComponent) ]
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
