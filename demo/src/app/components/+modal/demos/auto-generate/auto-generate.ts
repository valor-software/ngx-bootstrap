import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'demo-modal-auto-generate',
  templateUrl: './auto-generate.html'
})
export class DemoAutoGenerateModalServiceFromComponent {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ]
    };
    this.bsModalRef = this.modalService.show(ModalListContentComponent, { header: "List", complete: true, initialState: initialState });
    this.bsModalRef.setButtons([
      { text: "Okay", class: "btn btn-success", click: () => { this.bsModalRef.hide(); } },
      { text: "Cancel", class: "btn btn-warning", click: () => { this.bsModalRef.hide(); } }
    ]);
  }
}

/* This is a component which we pass in modal*/

@Component({
  selector: 'modal-content',
  template: `
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
  `
})

export class ModalListContentComponent implements OnInit {
  list: any[] = [];
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }
}
