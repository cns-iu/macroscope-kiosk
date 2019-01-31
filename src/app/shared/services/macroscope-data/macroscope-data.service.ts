import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacroscopeDataService {
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
