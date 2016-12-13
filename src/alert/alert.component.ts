import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertConfig } from './alert.config';

const ALERT_TEMPLATE = `
  <div class="alert" role="alert" [ngClass]="classes" *ngIf="!closed">
    <button *ngIf="dismissible" type="button" class="close" (click)="onClose()" (touch)="onClose()">
      <span aria-hidden="true">&times;</span>
      <span class="sr-only">Close</span>
    </button>
    <ng-content></ng-content>
  </div>
  `;

@Component({
  selector: 'alert',
  template: ALERT_TEMPLATE
})
export class AlertComponent implements OnInit {
  @Input() public type: string;
  @Input() public dismissible: boolean;
  @Input() public dismissOnTimeout: number;

  @Output() public close:EventEmitter<AlertComponent> = new EventEmitter<AlertComponent>(false);

  public closed: boolean;
  protected classes:string[] = [];

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
      setTimeout(() => this.onClose(), this.dismissOnTimeout);
    }
  }

  // todo: mouse event + touch + pointer
  public onClose(): void {
    this.closed = true;
    this.close.emit(this);
  }
}
