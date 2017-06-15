import { Component, ElementRef, Renderer, TemplateRef, ViewContainerRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ModalContainerComponent } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from './modal-content.component';

@Component({
  selector: 'demo-modal-service',
  templateUrl: './service.html'
})
export class DemoModalServiceComponent {
  public modalRef: ModalContainerComponent;
  constructor(private modalService: BsModalService, private element: ElementRef, private renderer: Renderer, private vcRef: ViewContainerRef) {
    this.modalService = this.modalService.create(this.element, this.vcRef, this.renderer);
  }
  public openModal(template: string | TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {backdrop: 'static'});
  }
  public openModalWithComponent() {
    this.modalService.show(ModalContentComponent);
  }
}
