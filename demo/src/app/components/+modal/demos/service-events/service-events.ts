import { Component, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'demo-modal-service-events',
  templateUrl: './service-events.html'
})
export class DemoModalServiceEventsComponent {
  public modalRef: BsModalRef;
  public subscriptions: Subscription[] = [];
  public messages: string[] = [];
  constructor(private modalService: BsModalService) {}

  public openModal(template: TemplateRef<any>) {
    this.messages = [];
    this.subscriptions.push(
      this.modalService.onShow.subscribe((reason: string) => {
        this.messages.push(`onShow event has been fired`);
      })
    );
    this.subscriptions.push(
      this.modalService.onShown.subscribe((reason: string) => {
        this.messages.push(`onShown event has been fired`);
      })
    );
    this.subscriptions.push(
      this.modalService.onHide.subscribe((reason: string) => {
        this.messages.push(
          `onHide event has been fired${reason
            ? ', dismissed by ' + reason
            : ''}`
        );
      })
    );
    this.subscriptions.push(
      this.modalService.onHidden.subscribe((reason: string) => {
        this.messages.push(
          `onHidden event has been fired${reason
            ? ', dismissed by ' + reason
            : ''}`
        );
        this.unsubscribe();
      })
    );
    this.modalRef = this.modalService.show(template);
  }

  public unsubscribe() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
    this.subscriptions = [];
  }
}
