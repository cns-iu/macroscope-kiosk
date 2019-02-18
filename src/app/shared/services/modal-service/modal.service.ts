import { Injectable, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
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

@Injectable({
  providedIn: 'root'
})
export class ModalService implements OnDestroy {
  modalOpened: Observable<boolean>;

  private subscriptions = new Set<Subscription>();

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

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.clear();
  }

  openModal(data: ModalData): void {
    this.modal.open(ModalComponent, {
      data: data,
      width: '75rem',
      panelClass: 'modal-dialog-container'
    });
  }

  closeModal(): void {
    this.modal.closeAll();
  }

  handleModal({ data, queryCsv }: ModalOptions): void {
    data ? this.openModal(data) : this.readCsvIntoModal(queryCsv);
  }

  private readCsvIntoModal({ database, filter: rawFilter }: QueryCsv): void {
    const { dataService: { data, uiDescriptions }, subscriptions } = this;
    const filter: PartialData = loReduce(rawFilter, (acc: any, { column, value }: Filter) => {
      return { ...acc, [column]: value };
    }, { });
    const source: DataArrayObservable = database === 'ui' ? uiDescriptions : data;

    const sub: Subscription = source.pipe(rxTake(1)).subscribe((allData: DataArray) => {
      const dataItem: ModalData = loFind(allData, filter);
      this.openModal(dataItem);
    }, undefined, () => subscriptions.delete(sub));

    if (!sub.closed) { subscriptions.add(sub); }
  }
}
