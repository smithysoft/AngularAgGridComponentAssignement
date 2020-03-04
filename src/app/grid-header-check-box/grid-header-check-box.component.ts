import { Component, OnInit } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-header-check-box',
  templateUrl: './grid-header-check-box.component.html',
  styleUrls: ['./grid-header-check-box.component.scss']
})
export class GridHeaderCheckBoxComponent implements OnInit, IHeaderAngularComp {
  params: IHeaderParams;

  constructor() {
  }

  ngOnInit(): void {
  }

  agInit(params: IHeaderParams): void {
    this.params = params;
  }

  toggle($event) {
    if ($event.target.checked) {
      this.params.api.selectAll();
      return;
    }
    this.params.api.deselectAll();
  }
}
