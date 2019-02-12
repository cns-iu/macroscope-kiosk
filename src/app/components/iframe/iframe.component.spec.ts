import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PartialDeep } from 'lodash';
import { of } from 'rxjs';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';

import { MacroscopeData } from '../../shared/csv-typings';
import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { IFrameComponent } from './iframe.component';

describe('IFrameComponent', () => {
  let activatedRoute: PartialDeep<ActivatedRoute>;
  let domSanitizer: PartialDeep<DomSanitizer>;
  let component: IFrameComponent;
  let fixture: ComponentFixture<IFrameComponent>;

  beforeEach(() => {
    activatedRoute = {
      params: of({
        iid: 14,
        mid: 1
      })
    };
  });

  beforeEach(() => {
    domSanitizer = {
      sanitize: () => 'safeString',
      bypassSecurityTrustResourceUrl: (url: string) => url
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule],
      declarations: [IFrameComponent],
      providers: [
        MacroscopeDataService,
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: DomSanitizer, useValue: domSanitizer },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update the macroscope', () => {
    const data: MacroscopeData  = {
      descriptionLong: 'this is decscription long',
      descriptionShort: 'this is description short',
      iterationId: 14,
      macroId: 1,
      url: 'http://someurl.com',
      descriptionTitle: 'Title',
      type: 'iframe',
      id: '1',
      logo: 'logo.png',
      subtitle: 'this is subtitle',
      title: 'this is title'
    };
    component.updateMacroscope([data]);
    expect(component.macroscopeUrl).toBeTruthy('http://someurl.com');
  });

  it('should update the macroscope', () => {
    const data: MacroscopeData  = {
      descriptionLong: 'this is decscription long',
      descriptionShort: 'this is description short',
      iterationId: 14,
      macroId: 1,
      url: null,
      descriptionTitle: 'Title',
      type: 'video',
      id: '1',
      logo: 'logo.png',
      subtitle: 'this is subtitle',
      title: 'this is title'
    };
    component.updateMacroscope([data]);
    expect(component.macroscopeUrl).toBeNull();
  });

});
