import { Component, ElementRef, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsModalService } from '../../../../../../../dist/modal/bs-modal.service';
import { ModalContainerComponent } from '../../../../../../../dist/modal/modal-container.component';

@Component({
  selector: 'demo-modal-static',
  templateUrl: './static.html'
})
export class DemoModalStaticComponent {
  public modalRef: ModalContainerComponent;
  constructor(private modalService: BsModalService, private element: ElementRef, private renderer: Renderer, private vcRef: ViewContainerRef) {}
  public openModal(template: string | TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.element, this.vcRef, this.renderer);
  }
  public hideModal() {
    this.modalRef.hide();
  }
}
