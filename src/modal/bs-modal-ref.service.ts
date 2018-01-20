import { Injectable } from '@angular/core';

@Injectable()
export class BsModalRef<T = any> {
  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  content?: T;

  /**
   * Hides the modal
   */
  hide: () => void = Function;
}
