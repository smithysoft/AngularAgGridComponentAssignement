import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AgGrid';

  columnDefs = [
    { headerName: '', field: 'thumbnails' },
    { headerName: 'Published on', field: 'publishedAt' },
    { headerName: 'Video Title', field: 'title' },
    { headerName: 'Description', field: 'description' }
  ];

  rowData = [
    { thumbnails: 'logo', publishedAt: 'today', title: 'link', description: 'description' },
  ];
}
