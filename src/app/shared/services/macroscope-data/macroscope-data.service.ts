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

  /**
   * Property to keep the parsed data of macroscope data CSV for subsequent usages
   */
  readonly data = this.fetchAndParseCsv<MacroscopeData>('assets/data/macroscope-data.csv');

  /**
   * Property to keep the parsed data of macroscope descriptions CSV for subsequent usages
   */
  readonly uiDescriptions = this.fetchAndParseCsv<MacroscopeUiDescription>('assets/data/macroscope-ui-descriptions.csv');


  /**
   * Creates an instance of macroscope data service.
   * @param httpClient Client to make a HTTP request to CSV
   */
  constructor(private readonly httpClient: HttpClient) { }


  /**
   * Fetchs and parse csv
   * @param pathInAssets The path of CSV you want to parse
   * @returns Observable that can be subscribed to get the parsed data
   */
  fetchAndParseCsv<T>(pathInAssets: string): Observable<T[]> {
    return this.httpClient.get(pathInAssets, { responseType: 'text' }).pipe(
      map(data => parse(data, { header: true, dynamicTyping: true, skipEmptyLines: true })),
      map(result => result.data),
      shareReplay()
    );
  }
}
