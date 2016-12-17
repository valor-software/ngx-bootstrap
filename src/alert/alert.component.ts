import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertConfig } from './alert.config';

const ALERT_TEMPLATE = `
<template [ngIf]="!isClosed">
  <div class="alert" role="alert" [ngClass]="classes">
    <template [ngIf]="dismissible">
      <button type="button" class="close" (click)="close()" (touch)="close()">
        <span aria-hidden="true">&times;</span>
        <span class="sr-only">Close</span>
      </button>
    </template>
    <ng-content></ng-content>
  </div>
</template>
  `;

@Component({
  selector: 'alert,ngx-alert',
  exportAs: 'bs-alert',
  template: ALERT_TEMPLATE
})
export class AlertComponent implements OnInit {
  /** Alert type. Provide one of the four supported by bootstrap contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() public type: string = 'warning';
  /** If set, displays an inline close button */
  @Input() public dismissible: boolean = false;
  /** Number of milliseconds, if specified sets a timeout duration, after which the alert will be closed */
  @Input() public dismissOnTimeout: number;

  public isClosed: boolean = false;

  /** This event fires immediately when the close instance method is called, $event is an instance of Alert component. */
  @Output() public onClose: EventEmitter<AlertComponent> = new EventEmitter<AlertComponent>(false);
  /** This event fires when alert closed, $event is an instance of Alert component */
  @Output() public onClosed: EventEmitter<AlertComponent> = new EventEmitter<AlertComponent>(false);

  protected classes: string[] = [];

  public constructor(_config: AlertConfig) {
    Object.assign(this, _config);
  }

  public ngOnInit(): void {
    this.classes[0] = `alert-${this.type}`;
    if (this.dismissible) {
      this.classes[1] = 'alert-dismissible';
    } else {
      this.classes.length = 1;
    }

    if (this.dismissOnTimeout) {
      setTimeout(() => this.close(), this.dismissOnTimeout);
    }
  }

  // todo: mouse event + touch + pointer
  // todo: animation ` If the .fade and .in classes are present on the element,
  // the alert will fade out before it is removed`
  /**
   * Closes an alert by removing it from the DOM.
   */
  public close(): void {
    this.onClose.emit(this);
    this.isClosed = true;
    this.onClosed.emit(this);
  }
}
