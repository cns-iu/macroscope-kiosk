import { HttpClientModule } from '@angular/common/http';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { ModalService } from './modal.service';
import { Subject } from 'rxjs';
import { MacroscopeDataService } from '../macroscope-data/macroscope-data.service';
import { Provider } from '@angular/core';
import { skip, take, toArray } from 'rxjs/operators';
import { MockRender } from 'ng-mocks';

describe('ModalService', () => {
  const mockedDataService = { data: new Subject(), uiDescriptions: new Subject() };
  const mockedMatDialog = {
    afterOpened: new Subject(),
    afterAllClosed: new Subject(),
    closeAll: (): void => undefined,
    open: (): void => undefined,
  };
  let dataService: typeof mockedDataService;
  let dialog: typeof mockedMatDialog;
  let fixture: ComponentFixture<void>;
  let service: ModalService;

  function takeOpenEvents(count = 1, skipFirst = true): Promise<boolean[]> {
    return service.modalOpened.pipe(
      skip(skipFirst ? 1 : 0),
      take(count),
      toArray()
    ).toPromise();
  }

  function expectedOpenArgs(data: any): any[] {
    return [
      jasmine.any(Function),
      jasmine.objectContaining({ data })
    ];
  }

  beforeEach(() => {
    const mockedProviders: Provider[] = [
      { provide: MacroscopeDataService, useValue: mockedDataService },
      { provide: MatDialog, useValue: mockedMatDialog }
    ];

    TestBed.configureTestingModule({
      providers: ([ModalService] as Provider[]).concat(mockedProviders)
    });
  });

  beforeEach(() => {
    fixture = MockRender('');
    dataService = TestBed.get(MacroscopeDataService);
    dialog = TestBed.get(MatDialog);
    service = TestBed.get(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit when a modal is opened', async () => {
    const events = takeOpenEvents();
    dialog.afterOpened.next();

    expect(await events).toEqual([true]);
  });

  it('should emit when a modal is closed', async () => {
    const events = takeOpenEvents();
    dialog.afterAllClosed.next();

    expect(await events).toEqual([false]);
  });

  it('should open a modal with the provided data', () => {
    const spy = spyOn(dialog, 'open');
    service.openModal('foo' as any);
    expect(spy).toHaveBeenCalledWith(...expectedOpenArgs('foo'));
  });

  it('should close modal', () => {
    const spy = spyOn(dialog, 'closeAll');
    service.closeModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should open a modal if the options contain data', () => {
    const spy = spyOn(dialog, 'open');
    service.handleModal({ data: 'bar' as any });
    expect(spy).toHaveBeenCalledWith(...expectedOpenArgs('bar'));
  });

  it('should get data from the database if the options contains a query', async () => {
    const item = { id: 1 };
    const spy = spyOn(dialog, 'open');

    service.handleModal({
      queryCsv: {
        database: 'ui',
        filter: [{ column: 'id', value: item.id }]
      }
    });
    dataService.uiDescriptions.next([item]);
    await fixture.whenStable();
    expect(spy).toHaveBeenCalled();
  });

  it('should cleanup subscriptions', () => {
    service.handleModal({ queryCsv: { database: 'macroscopes', filter: [] } });
    expect(dataService.data.observers.length).toEqual(1);
    service.ngOnDestroy();
    expect(dataService.data.observers.length).toEqual(0);
  });
});
