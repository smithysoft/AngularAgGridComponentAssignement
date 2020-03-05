import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { GridHeaderCheckBoxComponent } from './grid-header-check-box.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridService } from '../services/grid.service';

import { stubParams } from 'src/app/stubs';

describe('GridHeaderCheckBoxComponent', () => {
  let component: GridHeaderCheckBoxComponent;
  let fixture: ComponentFixture<GridHeaderCheckBoxComponent>;

  let gridService: GridService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridHeaderCheckBoxComponent],
      imports: [AgGridModule.withComponents([])],
      providers: [{ provide: GridService }],
    });

    fixture = TestBed.createComponent(GridHeaderCheckBoxComponent);
    gridService = TestBed.inject(GridService);

    component = fixture.componentInstance;
    component.params = stubParams;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should put value to rowsLength when grid changes', fakeAsync(() => {
    spyOn(component, 'getAllRows').and.returnValue(['a', 'b']);

    gridService.$grid.next();
    tick();

    expect(component.rowsLength).toBe(2);
  }));

  it('should put value to rowsSelectedLength when grid changes', fakeAsync(() => {
    spyOn(component, 'getAllRows').and.returnValue(['a', 'b']);

    gridService.$grid.next();
    tick();

    expect(component.rowsLength).toBe(2);
  }));

  it('should set "true" value of checkbox by rowsLength and rowsSelectedLength condition', fakeAsync(() => {
    spyOn(component, 'getAllRows').and.returnValue(['a', 'b']);

    gridService.$grid.next();
    tick();

    expect(component.checkbox.nativeElement.checked).toBeTruthy();
  }));

  it('should set "false" value of checkbox by rowsLength and rowsSelectedLength condition', fakeAsync(() => {
    spyOn(component, 'getAllRows').and.returnValue(['a']);

    gridService.$grid.next();
    tick();

    expect(component.checkbox.nativeElement.checked).toBeFalsy();
  }));

  it('should put IHeaderParams to params', () => {
    component.agInit(stubParams);

    expect(component.params).toBe(stubParams);
  });

  it('should select/deselect grid', () => {
    const selectAllSpy = spyOn(component.params.api, 'selectAll');
    const deselectAllSpy = spyOn(component.params.api, 'deselectAll');

    component.toggle({ target: { checked: true } });
    expect(selectAllSpy).toHaveBeenCalled();

    component.toggle({ target: { checked: false } });
    expect(deselectAllSpy).toHaveBeenCalled();
  });
});
