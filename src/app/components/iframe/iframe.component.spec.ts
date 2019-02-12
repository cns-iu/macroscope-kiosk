import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { PartialDeep } from 'lodash';
import { MockPipe } from 'ng-mocks';
import { of } from 'rxjs';
import { SafePipe } from 'src/app/shared/safe-pipe/safe.pipe';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';

import { MacroscopeDataService } from '../../shared/services/macroscope-data/macroscope-data.service';
import { IFrameComponent } from './iframe.component';

describe('IFrameComponent', () => {
  let activatedRoute: PartialDeep<ActivatedRoute>;
  let component: IFrameComponent;
  let fixture: ComponentFixture<IFrameComponent>;

  beforeEach(() => {
    activatedRoute = {
      paramMap: of({
        get(key: string): string {
          return key === 'iid' ? '14' : '1';
        }
      })
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, VgBufferingModule, VgControlsModule, VgCoreModule, VgOverlayPlayModule],
      declarations: [IFrameComponent, MockPipe(SafePipe)],
      providers: [
        MacroscopeDataService,
        { provide: ActivatedRoute, useValue: activatedRoute }
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
