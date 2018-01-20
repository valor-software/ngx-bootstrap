import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertConfig } from './alert.config';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';

@Component({
  selector: 'alert,bs-alert',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
  /** Alert type */
  @Input() type: AlertType = 'warning';

  get dismissible(): boolean {
    return this._dismissible;
  }

  /** If set, displays an inline 'Close' button */
  @Input()
  set dismissible(value: boolean) {
    this._dismissible = value;
    this.classes = this.dismissible ? 'alert-dismissible' : ';
  }

  /** Number in milliseconds, after which alert will be closed */
  @Input() dismissOnTimeout: number | string;

  /** Is alert visible */
  @Input() isOpen = true;

  /** This event fires immediately after close instance method is called,
   * $event is an instance of Alert component.
   */
  @Output() onClose = new EventEmitter<AlertComponent>();

  /** This event fires when alert closed, $event is an instance of Alert component */
  @Output() onClosed = new EventEmitter<AlertComponent>();

  classes = '';

  private _dismissible = false;

  constructor(_config: AlertConfig) {
    Object.assign(this, _config);
  }

  ngOnInit() {
    if (this.dismissOnTimeout) {
      /** if dismissOnTimeout used as attr without binding, it will be a string */
      setTimeout(() => this.close(),
        parseInt(this.dismissOnTimeout as string, 10)
      );
    }
  }

  // todo: animation ` If the .fade and .in classes are present on the element,
  // the alert will fade out before it is removed`
  /**
   * Closes an alert by removing it from the DOM.
   */
  close() {
    if (this.isOpen) {
      this.onClose.emit(this);
      this.isOpen = false;
      this.onClosed.emit(this);
    }
  }
}
