import { IHeaderParams } from 'ag-grid-community';
import { GridApi } from 'ag-grid-community/dist/lib/gridApi';

export const stubParams: IHeaderParams = {
  column: null,
  displayName: null,
  enableSorting: null,
  enableMenu: null,
  showColumnMenu: null,
  progressSort: null,
  setSort: null,
  columnApi: null,
  api: {
    getSelectedRows: () => ['mock', 'mock'],
    selectAll: () => null,
    deselectAll: () => null,
    getDisplayedRowCount: () => 1,
    sizeColumnsToFit: () => null
  } as GridApi,
  context: null,
  template: null
};
