import { Injectable } from '@angular/core';

import { ModalDialogButton } from './models';

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
   // tslint:disable-next-line:no-any
   setClass(newClass: string): void { };
   /**
    * Sets buttons to footer of modal window
    */
   // tslint:disable-next-line:no-any
   setButtons(buttons: ModalDialogButton[]): void { };
   /**
    * Sets header title of modal window
    */
   // tslint:disable-next-line:no-any
   setHeader(title: string): void { };
}
