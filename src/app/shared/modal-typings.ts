import { MacroscopeData, MacroscopeUiDescription } from './csv-typings';
/**
 * Typings for the modal data
 */
export type ModalData = MacroscopeUiDescription | MacroscopeData;

export interface ModalOptions {
  /**
   * Holds tha modal data like Description Long or Description Short
   */
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
