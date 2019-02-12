import { MacroscopeData, MacroscopeUiDescription } from './csv-typings';

export type ModalData = MacroscopeUiDescription | MacroscopeData;

export interface ModalOptions {
  data?: ModalData;
  queryCsv?: QueryCsv;
}

export interface QueryCsv {
  database: string;
  filter: Filter[];
}

export interface Filter {
  column?: string;
  value?: string | number;
}
