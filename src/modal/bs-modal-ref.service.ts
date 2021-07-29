import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class BsModalRef<T = any> {
  /**
   * Event that is fired when the modal behind the ref starts hiding
   */
  onHide?: EventEmitter<unknown>;
  /**
   * Event that is fired when the modal behind the ref finishes hiding
   */
  onHidden?: EventEmitter<unknown>;
  /**
   *  Allow user to ID for the modal. Otherwise, a unique number will be given
   */
  id?: number | string;

  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  content?: T;

  /**
   * Hides the modal
   */
  hide: () => void = () => void 0;
  /**
   * Sets new class to modal window
   */
  setClass: (newClass: string) => void = () => void 0;
}
