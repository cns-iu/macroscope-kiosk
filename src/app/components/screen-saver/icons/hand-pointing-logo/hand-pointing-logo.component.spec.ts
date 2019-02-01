import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HandPointingLogoComponent } from './hand-pointing-logo.component';

describe('HandPointingLogoComponent', () => {
  let component: HandPointingLogoComponent;
  let fixture: ComponentFixture<HandPointingLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HandPointingLogoComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HandPointingLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
