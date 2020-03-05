import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderCheckBoxComponent } from './grid-header-check-box.component';
import { AgGridModule } from 'ag-grid-angular';

describe('GridHeaderCheckBoxComponent', () => {
  let component: GridHeaderCheckBoxComponent;
  let fixture: ComponentFixture<GridHeaderCheckBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridHeaderCheckBoxComponent],
      imports: [ AgGridModule.withComponents([]) ]
    });

    fixture = TestBed.createComponent(GridHeaderCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
});
