import { MacroscopeData, MacroscopeUiDescription } from './csv-typings';
/**
 * Typings for the modal data
 */
export type ModalData = MacroscopeUiDescription | MacroscopeData;

/**
 * Modal options - options required to display the data into modal.
 */
export interface ModalOptions {
  /**
   * Holds tha modal data like Description Long or Description Short,
   * a data object that is directly displayed into modal
   */
  data?: ModalData;

  /**
   * query the data read by the csv and inject into modal.
   */
  queryCsv?: QueryCsv;
}

/**
 * Query csv - interface that defines the things needed to query csv data for the modal.
 */
export interface QueryCsv {

  /**
   * the type of data read by csv reader.
   */
  database: string;

  /**
   * filter - array of Filter objects that is needed to filter the 'database'.
   */
  filter: Filter[];
}


/**
 * Filter - takes column and the value to filter csv data.
 */
export interface Filter {

  /**
   * specifies what fields need to be filtered on.
   */
  column?: string;

  /**
   * specifies value that needs to be filtered from the data.
   */
  value?: string | number;
}
