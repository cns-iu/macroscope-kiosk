import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng-mocks';

import { ContainerLogoComponent } from '../icons/container-logo/container-logo.component';
import { ScreenSaverHeaderComponent } from './screen-saver-header.component';

describe('ScreenSaverHeaderComponent', () => {
  let component: ScreenSaverHeaderComponent;
  let fixture: ComponentFixture<ScreenSaverHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ScreenSaverHeaderComponent, MockComponent(ContainerLogoComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScreenSaverHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
