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

import { SafePipe } from '../../shared/safe-pipe/safe.pipe';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, MatDialogModule],
      declarations: [
        ModalComponent,
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
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
