import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatIcon,
} from '@angular/material';
import { MockComponents, MockPipe } from 'ng-mocks';

import { DescriptionModalContentComponent } from './description-modal-content.component';
import { SafePipe } from '../../../shared/safe-pipe/safe.pipe';

describe('DescriptionModalContentComponent', () => {
  let component: DescriptionModalContentComponent;
  let fixture: ComponentFixture<DescriptionModalContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
      declarations: [
        DescriptionModalContentComponent,
        MockComponents(MatExpansionPanel, MatExpansionPanelHeader, MatIcon),
        MockPipe(SafePipe)
      ],
      providers: [
        MatDialog,
        { provide : MatDialogRef, useValue : {} },
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescriptionModalContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
