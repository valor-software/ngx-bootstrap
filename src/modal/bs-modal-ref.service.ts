import { Injectable } from '@angular/core';

@Injectable()
export class BsModalRef {
  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  // tslint:disable-next-line:no-any
  content?: any | null;

  /**
   * Hides the modal
   */
  hide: () => void = Function;
  /**
   * Sets new class to modal window
   */
  setClass: (newClass: string) => void = Function;
}
