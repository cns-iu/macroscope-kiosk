import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { Observable, Subject } from 'rxjs';

export interface MacroscopeData {
  id: string;
  macroId: number;
  iterationId: number;
  title: string;
  subtitle: string;
  url: string;
  logo: string;
  descriptionTitle: string;
  descriptionShort: string;
  descriptionLong: string;
}

@Injectable({
  providedIn: 'root'
})
export class MacroscopeDataService {
  getMacroscopeData(pathInAssets: string): Observable<MacroscopeData[]> {
    const macroscopeFileData = new Subject<MacroscopeData[]>();
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
