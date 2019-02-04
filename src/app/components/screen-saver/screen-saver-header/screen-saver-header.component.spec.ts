import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenSaverHeaderComponent } from './screen-saver-header.component';

/* mocking screensaver component */
@Component({
  selector: 'app-container-logo',
  template: ''
})
class MockContainerLogoComponent {
}


describe('ScreenSaverHeaderComponent', () => {
  let component: ScreenSaverHeaderComponent;
  let fixture: ComponentFixture<ScreenSaverHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenSaverHeaderComponent, MockContainerLogoComponent ]
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
