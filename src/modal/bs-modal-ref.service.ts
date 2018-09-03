import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BsModalRef {
  /**
   * Reference to a component inside the modal. Null if modal's been created with TemplateRef
   */
  content?: any | null;

  /**
   * Hides the modal
   */
  hide: (msg?: any | null) => void = Function;


  /**
   * Emits on modal hide with any supplied arguments in hide()
   */
  onHide: EventEmitter<any | null>;
}
