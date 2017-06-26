import { ElementRef, Injectable, Renderer, ViewContainerRef } from '@angular/core';
import { BsModalService } from './bs-modal.service';

@Injectable()
export class BsModalFactory {
  constructor(public modalService: BsModalService, private vcRef: ViewContainerRef) {
    this.modalService.create(null, this.vcRef, null);
  }
}
