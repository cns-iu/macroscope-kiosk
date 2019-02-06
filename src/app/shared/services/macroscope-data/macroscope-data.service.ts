import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, Subject } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { MacroscopeData, MacroscopeUiDescription } from '../../csv-typings';

@Injectable({
  providedIn: 'root'
})
export class MacroscopeDataService {
  readonly data = this.fetchAndParseCsv<MacroscopeData>('assets/macroscope-data.csv').pipe(shareReplay());
  readonly uiDescriptions = this.fetchAndParseCsv<MacroscopeUiDescription>('assets/macroscope-ui-descriptions.csv').pipe(shareReplay());

  fetchAndParseCsv<T>(pathInAssets: string): Observable<T[]> {
    const macroscopeFileData = new Subject<T[]>();
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
