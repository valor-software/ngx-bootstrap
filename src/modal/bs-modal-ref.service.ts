import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
// tslint:disable-next-line:no-any
export class BsModalRef<T = any> {
  /**
   *  Allow user to ID for the modal. Otherwise, a unique number will be given
   */
  id: number;

  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  content?: T | null;

  /**
   * Hides the modal
   */
  hide: () => void = Function;
  /**
   * Sets new class to modal window
   */
  setClass: (newClass: string) => void = Function;
  /**
   * Event that is fired when the modal behind the ref starts hiding
   */
  // tslint:disable-next-line:no-any
  onHide: EventEmitter<any>;
  /**
   * Event that is fired when the modal behind the ref finishes hiding
   */
  // tslint:disable-next-line:no-any
  onHidden: EventEmitter<any>;
}
