import { Component, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from './services/youtube.service';
import { GridHeaderCheckBoxComponent } from './grid-header-check-box/grid-header-check-box.component';
import { GridService } from './services/grid.service';
import { ClipboardModule } from '@ag-grid-enterprise/clipboard';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DatePipe],
})
export class AppComponent implements OnInit {
  @ViewChild('grid') grid;

  rowData: any;
  rowSelectedCount: any;
  dataCount: any;

  rowSelection: ('multiple' | null) = 'multiple';
  modules = [ClipboardModule];

  columnDefs = [
    {
      colId: 'checkbox', checkboxSelection: true, resizable: false, suppressSizeToFit: true, width: 40,
      headerComponentFramework: GridHeaderCheckBoxComponent,
    },
    {
      headerName: '', field: 'thumbnails', sortable: true, autoHeight: true, suppressSizeToFit: true, width: 120,
      cellRenderer: (cell) => `<img src="${cell.value.default.url}" height="90" width="120" alt="avatar"> `
    },
    {
      headerName: 'Published on', field: 'publishedAt', sortable: true,
      cellRenderer: (cell) => this.transformDate(cell.value)
    },
    {
      headerName: 'Video Title', field: 'title', sortable: true, cellStyle: { 'white-space': 'normal' },
      cellRenderer: (cell) => `<a href="https://www.youtube.com/watch?v=${cell.data.videoId}" target="_blank">${cell.value}</a>`
    },
    { headerName: 'Description', field: 'description', sortable: true, cellStyle: { 'white-space': 'normal' } }
  ];

  constructor(public youtubeService: YoutubeService, private gridService: GridService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.youtubeService.get()
      .subscribe(resp => this.rowData = resp);

    this.gridService.$toggleMode
      .subscribe(val => {
        this.rowSelection = val ? 'multiple' : null;
        this.grid.api.deselectAll();

        this.grid.columnApi.setColumnVisible('checkbox', val);
      });
  }

  onSelectionChanged($event) {
    this.rowSelectedCount = $event.api.getSelectedRows().length;

    this.gridService.$grid.next();
  }

  onGridReady($event) {
    this.dataCount = $event.api.getDisplayedRowCount();

    $event.api.sizeColumnsToFit();
  }

  toggle() {
    const toggleMode = !this.grid.columnApi.getColumn('checkbox').visible;

    this.gridService.$toggleMode.next(toggleMode);
  }

  getContextMenuItems(params) {
    const result = [];

    if (params.column.colId === 'title') {
      result.push({
        name: 'Open in new tab',
        action: () => window.open(`https://www.youtube.com/watch?v=${params.node.data.videoId}`, '_blank')
      });
    }

    result.push('copy');
    result.push('paste');

    return result;
  }

  transformDate(date) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
