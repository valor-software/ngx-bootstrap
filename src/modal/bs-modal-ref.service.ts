import { Injectable } from '@angular/core';

@Injectable()
export class BsModalRef {
  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  // tslint:disable-next-line:no-any
  content?: any | null;

  /**
   * Hides the modal and resolves the promise
   */
  // tslint:disable-next-line:no-any
  hide: (result?: any) => void = Function;

  /**
   * Dismisses the modal and rejects the promise
   */
  // tslint:disable-next-line:no-any
  dismiss: (result?: any) => void = Function;

  /**
   * A promise which resolves on BsModalRef.hide(arg) and rejects on BsModalRef.dismiss(arg)
   */
  // tslint:disable-next-line:no-any
  result: Promise<any|void>;

  /**
   * Sets new class to modal window
   */
  setClass: (newClass: string) => void = Function;
}
