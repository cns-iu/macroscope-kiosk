import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PartialDeep } from 'lodash';
import { MockComponents } from 'ng-mocks';
import { of } from 'rxjs';

import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { CarouselComponent } from '../carousel/carousel.component';
import { HeaderComponent } from '../header/header.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let activatedRoute: PartialDeep<ActivatedRoute>;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: PartialDeep<Router>;

  beforeEach(() => {
    activatedRoute = {
      firstChild: {
        snapshot: {
          paramMap: {
            get: jasmine.createSpy(),
          }
        }
      }
    };
  });

  beforeEach(() => {
    router = {
      navigate: jasmine.createSpy(),
      events: of()
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule, RouterTestingModule],
      declarations: [HomeComponent, MockComponents(HeaderComponent, CarouselComponent)],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        ChangeDetectorRef, MacroscopeDataService, MatDialog,
        { provide: Router, useValue: router },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
