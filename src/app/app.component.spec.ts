import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import { stubParams } from 'src/app/stubs';
import { GridService } from './services/grid.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  let gridService: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        HttpClientModule,
        AgGridModule.withComponents([]),
      ],
      providers: [{ provide: GridService }]
    });

    fixture = TestBed.createComponent(AppComponent);
    gridService = TestBed.inject(GridService);

    component = fixture.componentInstance;
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should return ContextMenuItems for grid', () => {
    const mockReturn = JSON.stringify(['copy', 'paste']);
    const mockReturnTitle = JSON.stringify([{
      name: 'Open in new tab',
      action: () => window.open(`https://www.youtube.com/watch?v=XXXX`, '_blank')
    }, 'copy', 'paste']);

    const paramsTitle = { column: { colId: 'title' } };
    const expectObjTitle = JSON.stringify(component.getContextMenuItems(paramsTitle));
    expect(expectObjTitle).toEqual(mockReturnTitle);

    const params = { column: { colId: 'some' } };
    const expectObj = JSON.stringify(component.getContextMenuItems(params));
    expect(expectObj).toEqual(mockReturn);
  });

  it('should put value to dataCount', () => {
    component.onGridReady(stubParams);

    expect(component.dataCount).toBeTruthy();
  });

  it('should call sizeColumnsToFit', () => {
    const spyStubParams = spyOn(stubParams.api, 'sizeColumnsToFit');
    component.onGridReady(stubParams);

    expect(spyStubParams).toHaveBeenCalled();
  });

  it('should put value to rowSelectedCount', () => {
    component.onSelectionChanged(stubParams);

    expect(component.rowSelectedCount).toBe(2);
  });

  it('should call $grid.next() of GridService', () => {
    const spy = spyOn(gridService.$grid, 'next');
    component.onSelectionChanged(stubParams);

    expect(spy).toHaveBeenCalled();
  });
});
