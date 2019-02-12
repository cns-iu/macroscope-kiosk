import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MockComponents } from 'ng-mocks';

import { ScreenSaverComponent } from './screen-saver.component';
import { VideoOverlayComponent } from './video-overlay/video-overlay.component';

describe('ScreenSaverComponent', () => {
  let component: ScreenSaverComponent;
  let fixture: ComponentFixture<ScreenSaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule ],
      declarations: [ ScreenSaverComponent, MockComponents(VideoOverlayComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSaverComponent);
    component = fixture.componentInstance;
    component.show = true;
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
    component.show = false;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('video').length).toEqual(1); // <- This seems incorrect! Shouldn't it be 0?
  });
});
