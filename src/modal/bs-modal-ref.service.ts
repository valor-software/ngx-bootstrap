import { Injectable } from '@angular/core';

@Injectable()
export class BsModalRef {
  /**
   *  Allow user to ID for the modal. Otherwise, a unique number will be given
  */
  id: number;
  
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
