import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from '../../../../../dist/components/modal';

@Component({
  selector: 'modal-demo',
  templateUrl: './modal-demo.component.html'
})
export class ModalDemoComponent {
  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }
}
