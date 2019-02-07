import { MacroscopeData, MacroscopeUiDescription } from '../../csv-typings';

export interface ModalOptions {
    data?: MacroscopeData | MacroscopeUiDescription;
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
