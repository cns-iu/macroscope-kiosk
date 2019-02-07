import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { PartialDeep } from 'lodash';
import { of } from 'rxjs';

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
      bypassSecurityTrustHtml: () => 'safeString'
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
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
});
