import { Component, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from './services/youtube.service';
import { GridHeaderCheckBoxComponent } from './grid-header-check-box/grid-header-check-box.component';
import { GridService } from './services/grid.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('grid') grid;

  title = 'AgGrid';

  rowData: any;
  rowSelectedCount: any;
  dataCount: any;
  toggleMode = true;
  rowSelection: ('multiple' | null) = 'multiple';

  columnDefs = [
    {
      colId: 'checkbox',
      headerComponentFramework: GridHeaderCheckBoxComponent,
      checkboxSelection: true,
    },
    {
      headerName: '', field: 'thumbnails', sortable: true, autoHeight: true,
      cellRenderer: (cell) => `<img src="${cell.value.default.url}" height="90" width="120" alt="avatar"> `
    },
    { headerName: 'Published on', field: 'publishedAt', sortable: true },
    {
      headerName: 'Video Title', field: 'title', sortable: true, cellStyle: { 'white-space': 'normal' },
      cellRenderer: (cell) => `<a href="https://www.youtube.com/watch?v=${cell.data.videoId}" target="_blank">${cell.value}</a>`
    },
    { headerName: 'Description', field: 'description', sortable: true, cellStyle: { 'white-space': 'normal' }, }
  ];

  constructor(public youtubeService: YoutubeService, private gridService: GridService) {
  }

  ngOnInit(): void {
    this.youtubeService.get()
      .subscribe((resp) => this.rowData = resp);
  }

  onSelectionChanged($event) {
    this.rowSelectedCount = $event.api.getSelectedRows().length;
    this.gridService.$grid.next();
  }

  onGridReady($event) {
    this.dataCount = $event.api.getDisplayedRowCount();
  }

  toggle() {
    this.toggleMode = !this.grid.columnApi.getColumn('checkbox').visible;

    this.rowSelection = this.toggleMode ? 'multiple' : null;
    this.grid.api.deselectAll();

    this.grid.columnApi.setColumnVisible('checkbox', this.toggleMode);
  }
}
