import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MacroscopeDataService {

  constructor() { }

  getMacroscopeData(pathInAssets: string): Observable<any> {
    const macroscopeFileData = new Subject<any>();
    parse(pathInAssets, {
      download: true,
      complete : (result) => {
        macroscopeFileData.next(result.data);
      }
    });
    return macroscopeFileData.asObservable();
  }
}
