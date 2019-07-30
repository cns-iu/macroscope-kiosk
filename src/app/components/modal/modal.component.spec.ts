import { Provider, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { By } from '@angular/platform-browser';
import { MockComponents, MockModule, MockRender } from 'ng-mocks';

import { mock as SafePipeMock } from '../../shared/safe-pipe/safe.pipe.mock';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  const mockedDialogRef = { close: (): void => undefined };
  const mockedModalData = { descriptionShort: '', descriptionLong: '' };
  let component: ModalComponent;
  let fixture: ComponentFixture<void>;

  beforeEach(async () => {
    const mockedImports = [
      MockModule(MatExpansionModule)
    ];
    const mockedDeclarations: Type<any>[] = MockComponents(
      MatIcon
    );
    const mockedProviders: Provider[] = [
      { provide: MatDialogRef, useValue: mockedDialogRef },
      { provide: MAT_DIALOG_DATA, useValue: mockedModalData }
    ];

    TestBed.configureTestingModule({
      imports: mockedImports,
      declarations: [ModalComponent, SafePipeMock].concat(mockedDeclarations),
      providers: mockedProviders
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = MockRender(`<app-modal></app-modal>`);
    component = fixture.debugElement.query(By.directive(ModalComponent)).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle information on expand/collapse click', () => {
    const element = fixture.debugElement.query(By.css('.expansion-toggle-container'));
    const previousValue = component.expandPanelOpen;

    element.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.expandPanelOpen).not.toEqual(previousValue);
  });

  it('should close on close button click', () => {
    const element = fixture.debugElement.query(By.css('.close-button'));
    const spy = spyOn(TestBed.get(MatDialogRef), 'close');

    element.triggerEventHandler('click', null);
    expect(spy).toHaveBeenCalled();
  });
});
