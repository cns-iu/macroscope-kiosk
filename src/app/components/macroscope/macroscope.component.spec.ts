import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';

import { HeaderComponent } from '../header/header.component';
import { MacroscopeComponent } from './macroscope.component';

describe('MacroscopeComponent', () => {
  let component: MacroscopeComponent;
  let fixture: ComponentFixture<MacroscopeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MacroscopeComponent, MockComponent(HeaderComponent) ],
      providers: [Location]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroscopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
        expect(component).toBeTruthy();
      });
});
