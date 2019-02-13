import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parse } from 'papaparse';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { MacroscopeData, MacroscopeUiDescription } from '../../csv-typings';

@Injectable({
  providedIn: 'root'
})
export class MacroscopeDataService {
  readonly data = this.fetchAndParseCsv<MacroscopeData>('assets/data/macroscope-data.csv');
  readonly uiDescriptions = this.fetchAndParseCsv<MacroscopeUiDescription>('assets/data/macroscope-ui-descriptions.csv');

  constructor(private readonly httpClient: HttpClient) { }

  fetchAndParseCsv<T>(pathInAssets: string): Observable<T[]> {
    return this.httpClient.get(pathInAssets, { responseType: 'text' }).pipe(
      map(data => parse(data, { header: true, dynamicTyping: true, skipEmptyLines: true })),
      map(result => result.data),
      shareReplay()
    );
  }
}
