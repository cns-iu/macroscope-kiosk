import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, ReplaySubject } from 'rxjs';

import { MacroscopeData, MacroscopeUiDescription } from '../../csv-typings';

@Injectable({
  providedIn: 'root'
})
export class MacroscopeDataService {
  readonly data = this.fetchAndParseCsv<MacroscopeData>('assets/macroscope-data.csv');
  readonly uiDescriptions = this.fetchAndParseCsv<MacroscopeUiDescription>('assets/macroscope-ui-descriptions.csv');

  fetchAndParseCsv<T>(pathInAssets: string): Observable<T[]> {
    const macroscopeFileData = new ReplaySubject<T[]>();
    parse(pathInAssets, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,

      complete : ({ data }) => {
        macroscopeFileData.next(data);
        macroscopeFileData.complete();
      },
      error: (err) => {
        macroscopeFileData.error(err);
      }
    });

    return macroscopeFileData.asObservable();
  }
}
