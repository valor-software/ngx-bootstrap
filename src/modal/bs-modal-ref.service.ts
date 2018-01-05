import { Injectable } from '@angular/core';

@Injectable()
export class BsModalRef {
  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  content?: any | null;

  /**
   * Hides the modal
   */
  hide: () => void = Function;
}
