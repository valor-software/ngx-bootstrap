import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertConfig } from './alert.config';

const ALERT_TEMPLATE = `
  <div class="alert" role="alert" [ngClass]="classes" *ngIf="!closed">
    <button *ngIf="dismissible" type="button" class="close" (click)="close()" (touch)="close()">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
    <ng-content></ng-content>
  </div>
  `;

@Component({
  selector: 'alert,ngx-alert',
  template: ALERT_TEMPLATE
})
export class AlertComponent implements OnInit {
  /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
  @Input() public type: string = 'warning';
  /** determines if an inline close button is displayed */
  @Input() public dismissible: boolean = false;
  /** number of milliseconds, if specified sets a timeout duration, after which the alert will be closed */
  @Input() public dismissOnTimeout: number;
  // todo: rename in onClosed
  /** fired when alert closed with inline button or by timeout, $event is an instance of Alert component */
  @Output() public onClose: EventEmitter<AlertComponent> = new EventEmitter<AlertComponent>(false);
  @Output() public onClosed: EventEmitter<AlertComponent> = new EventEmitter<AlertComponent>(false);

  public closed: boolean;
  protected classes: string[] = [];

  public config: AlertConfig;

  public constructor(config: AlertConfig) {
    this.config = config;
    this.configureOptions();
  }

  public configureOptions(): void {
    Object.assign(this, this.config);
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
  // todo: animatin ` If the .fade and .in classes are present on the element, the alert will fade out before it is removed`
  /**
   * Closes an alert by removing it from the DOM.
   */
  public close(): void {
    this.onClose.emit(this);
    this.closed = true;
    this.onClosed.emit(this);
  }
}
