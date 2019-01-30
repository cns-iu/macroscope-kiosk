import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScreenSaverComponent } from './screen-saver.component';

describe('ScreenSaverComponent', () => {
  let component: ScreenSaverComponent;
  let fixture: ComponentFixture<ScreenSaverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule
      ],
      declarations: [ ScreenSaverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSaverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the screen saver component', () => {
    component.showScreenSaver = true;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render the video tag', () => {
    component.showScreenSaver = true;
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('video').length).toEqual(1);
  });
});
