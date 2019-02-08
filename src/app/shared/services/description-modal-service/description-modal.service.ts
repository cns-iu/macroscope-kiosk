import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { filter, map } from 'lodash';

import {
  DescriptionModalDialogComponent,
} from '../../../components/modal/description-modal-dialog/description-modal-dialog.component';
import { MacroscopeData, MacroscopeUiDescription } from '../../csv-typings';
import { MacroscopeDataService } from '../macroscope-data/macroscope-data.service';
import { Filter, ModalOptions, QueryCsv } from './modal-typings';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DescriptionModalService {
  descriptionModalDialogInstance: DescriptionModalDialogComponent;
  modalData: MacroscopeUiDescription | MacroscopeData;

  private dialogOpenedSubject = new BehaviorSubject<boolean>(false);
  dialogOpened: Observable<boolean> = this.dialogOpenedSubject.asObservable();

  constructor(private dialog: MatDialog, private macroscopeDataService: MacroscopeDataService) {
    this.descriptionModalDialogInstance = new DescriptionModalDialogComponent(dialog);
    this.dialog.afterAllClosed.subscribe(_ => {
      this.dialogOpenedSubject.next(false);
    });
    this.dialog.afterOpened.subscribe(_ => {
      this.dialogOpenedSubject.next(true);
    });
  }

  handleModal(modalOptions: ModalOptions) {
    if (!modalOptions.data) {
      this.readCsvIntoModal(modalOptions.queryCsv);
    } else {
      this.descriptionModalDialogInstance.openDialog(modalOptions.data);
    }
  }

  readCsvIntoModal(queryCsv: QueryCsv) {
    const filterCriteria: any = {};
    map(queryCsv.filter, (obj: Filter) => {
      filterCriteria[obj.column] = obj.value;
    });
    if (queryCsv.database === 'ui') {
      this.macroscopeDataService.uiDescriptions.subscribe((data: MacroscopeUiDescription[]) => {
        this.filterModalData(data, filterCriteria);
        this.descriptionModalDialogInstance.openDialog(this.modalData);
      });
    } else if (queryCsv.database === 'macroscope') {
      this.macroscopeDataService.data.subscribe((data: MacroscopeData[]) => {
        this.filterModalData(data, filterCriteria);
        this.descriptionModalDialogInstance.openDialog(this.modalData);
      });
    }
  }

  filterModalData(data: MacroscopeData[] | MacroscopeUiDescription[], filterCriteria: Filter) {
    this.modalData = filter(data, filterCriteria)[0] as MacroscopeUiDescription | MacroscopeData;
    if (!this.modalData) {
      this.modalData = {} as any;
    }
  }

  closeModal() {
    this.descriptionModalDialogInstance.dialog.closeAll();
  }
}
