import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderCheckBoxComponent } from './grid-header-check-box.component';

describe('GridHeaderCheckBoxComponent', () => {
  let component: GridHeaderCheckBoxComponent;
  let fixture: ComponentFixture<GridHeaderCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridHeaderCheckBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridHeaderCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
