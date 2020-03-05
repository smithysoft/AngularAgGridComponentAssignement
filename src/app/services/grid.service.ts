import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  $grid = new Subject();

  constructor() { }
}
