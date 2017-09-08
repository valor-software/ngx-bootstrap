import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'demo-modal-service-component',
  templateUrl: './service-component.html'
})
export class DemoModalServiceFromComponent {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}

  public openModalWithComponent() {
    let data = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {data});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}

/* This is a component which we pass in modal*/

@Component({
  selector: 'modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">{{closeBtnName}}</button>
    </div>
  `
})
export class ModalContentComponent implements OnInit{
  public title: string;
  public closeBtnName: string;
  public list: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  public ngOnInit() {
    this.list.push('PROFIT!!!');
  }
}
