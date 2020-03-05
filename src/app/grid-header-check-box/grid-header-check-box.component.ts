import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { GridApi, IHeaderParams } from 'ag-grid-community';
import { GridService } from '../services/grid.service';

@Component({
  selector: 'app-grid-header-check-box',
  templateUrl: './grid-header-check-box.component.html',
  styleUrls: ['./grid-header-check-box.component.scss']
})
export class GridHeaderCheckBoxComponent implements OnInit, IHeaderAngularComp {
  @ViewChild('checkbox') checkbox: ElementRef<any>;

  params: IHeaderParams;

  rowsLength: number;
  rowsSelectedLength: number;

  constructor(private gridService: GridService) {
  }

  ngOnInit(): void {
    this.gridService.$grid.subscribe(() => {
      this.rowsLength = this.getAllRows(this.params.api).length;
      this.rowsSelectedLength = this.params.api.getSelectedRows().length;

      this.checkbox.nativeElement.checked = (this.rowsLength === this.rowsSelectedLength);
    });
  }

  agInit(params: IHeaderParams): void {
    this.params = params;
  }

  toggle($event) {
    $event.target.checked ? this.params.api.selectAll() : this.params.api.deselectAll();
  }

  getAllRows(gridApi: GridApi) {
    const rowData = [];

    gridApi.forEachNode(node => rowData.push(node.data));

    return rowData;
  }
}
