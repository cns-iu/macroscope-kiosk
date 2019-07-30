import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { find as loFind, reduce as loReduce } from 'lodash';
import { merge, Observable, of, Subscription } from 'rxjs';
import { map as rxMap, shareReplay as rxShareReplay, take as rxTake } from 'rxjs/operators';

import { ModalComponent } from '../../../components/modal/modal.component';
import { MacroscopeData, MacroscopeUiDescription } from '../../csv-typings';
import { Filter, ModalData, ModalOptions, QueryCsv } from '../../modal-typings';
import { MacroscopeDataService } from '../macroscope-data/macroscope-data.service';

type DataArray = MacroscopeUiDescription[] | MacroscopeData[];
type DataArrayObservable = Observable<MacroscopeUiDescription[]> | Observable<MacroscopeData[]>;
type PartialData = Partial<MacroscopeUiDescription> | Partial<MacroscopeData>;

/**
 * Used by components to open or close modal.
 */
@Injectable({
  providedIn: 'root'
})
export class ModalService implements OnDestroy {

  /**
   * specify if the modal is opened and bind some action to it.
   */
  modalOpened: Observable<boolean>;

  /**
   * Subscriptions  of modal service.
   * contains all the subscriptions to later clean up in ngOnDestroy.
   */
  private subscriptions = new Set<Subscription>();


  /**
   * Creates an instance of modal service.
   * @param dataService csv reader service.
   * @param modal MAtdialog that creates a dialog (Modal).
   */
  constructor(
    private readonly dataService: MacroscopeDataService,
    private readonly modal: MatDialog,
  ) {
    this.modalOpened = merge(
      of(false),
      modal.afterAllClosed.pipe(rxMap(() => false)),
      modal.afterOpened.pipe(rxMap(() => true))
    ).pipe(rxShareReplay(1));
  }

  /**
   * on destroy clean up all subscriptions
   */
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.clear();
  }


  /**
   * Opens modal - MatDialog and renders ModalComponent inside it.
   * @param data is of type MacroscopeData
   */
  openModal(data: ModalData): void {
    this.modal.open(ModalComponent, {
      data: data,
      width: '75rem',
      panelClass: 'modal-dialog-container'
    });
  }


  /**
   * Closes modal.
   */
  closeModal(): void {
    this.modal.closeAll();
  }


  /**
   * Handles modal
   * @param data actual data read by csv reader.
   * @param queryCsv or read the data by querying csv data.
   */
  handleModal({ data, queryCsv }: ModalOptions): void {
    data ? this.openModal(data) : this.readCsvIntoModal(queryCsv);
  }

  /**
   * Reads csv into modal
   * @param database database is the data read by csv reader.
   * @param filter filter is array of key-value pairs, the ky is the column and value is the value
   * to be filtered on.
   */
  private readCsvIntoModal({ database, filter: rawFilter }: QueryCsv): void {
    const { dataService: { data, uiDescriptions }, subscriptions } = this;
    const filter: PartialData = loReduce(rawFilter, (acc: any, { column, value }: Filter) => {
      return { ...acc, [column]: value };
    }, {});
    const source: DataArrayObservable = database === 'ui' ? uiDescriptions : data;

    let sub: Subscription;
    sub = source.pipe(rxTake(1)).subscribe({
      next: (allData: DataArray) => {
        const dataItem: ModalData = loFind(allData, filter);
        this.openModal(dataItem);
      },
      complete: () => subscriptions.delete(sub)
    });

    if (!sub.closed) { subscriptions.add(sub); }
  }
}
