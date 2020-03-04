import { Component, OnInit, ViewChild } from '@angular/core';
import { YoutubeService } from './services/youtube.service';

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

  columnDefs = [
    {
      colId: 'checkbox',
      headerCheckboxSelection: true,
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

  constructor(public youtubeService: YoutubeService) {
  }

  ngOnInit(): void {
    this.youtubeService.get()
      .subscribe((resp) => this.rowData = resp);
  }

  onSelectionChanged($event) {
    this.rowSelectedCount = $event.api.getSelectedRows().length;
  }

  onGridReady($event) {
    this.dataCount = $event.api.getDisplayedRowCount();
  }

  toggle() {
    this.grid.api.rowSelection = 'none';
    this.grid.api.deselectAll();

    this.toggleMode = !this.grid.columnApi.getColumn('checkbox').visible;
    this.grid.columnApi.setColumnVisible('checkbox', this.toggleMode);
  }
}
