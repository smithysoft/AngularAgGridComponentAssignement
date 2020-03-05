import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import 'ag-grid-enterprise';

import { HttpClientModule } from '@angular/common/http';
import { GridHeaderCheckBoxComponent } from './grid-header-check-box/grid-header-check-box.component';

@NgModule({
  declarations: [
    AppComponent,
    GridHeaderCheckBoxComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
