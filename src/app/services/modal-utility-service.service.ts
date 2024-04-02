import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private display: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  watch(): BehaviorSubject<boolean> {
    return this.display;
  }

  open() {
    this.display.next(true);
  }

  close() {
    this.display.next(false);
  }
}
