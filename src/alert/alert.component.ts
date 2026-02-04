import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  effect,
  input,
  output
} from '@angular/core';
import { AlertConfig } from './alert.config';
import { NgClass } from '@angular/common';

@Component({
    selector: 'alert,bs-alert',
    templateUrl: './alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgClass]
})
export class AlertComponent implements OnInit {
  /** Alert type.
   * Provides one of four bootstrap supported contextual classes:
   * `success`, `info`, `warning` and `danger`
   */
  type = input<string>(this._config.type);
  /** If set, displays an inline "Close" button */
  dismissible = input<boolean>(this._config.dismissible);
  /** Number in milliseconds, after which alert will be closed */
  dismissOnTimeout = input<number | string | undefined>(this._config.dismissOnTimeout);

  /** Is alert visible */
  isOpen = input<boolean>(true);

  /** This event fires immediately after close instance method is called,
   * $event is an instance of Alert component.
   */
  onClose = output<AlertComponent>();
  /** This event fires when alert closed, $event is an instance of Alert component */
  onClosed = output<AlertComponent>();

  classes = '';
  _isOpen = true;

  constructor(private _config: AlertConfig, private changeDetection: ChangeDetectorRef) {

    // Use effect to watch for dismissible changes
    effect(() => {
      const dismissibleValue = this.dismissible();
      this.classes = dismissibleValue ? 'alert-dismissible' : '';
      this.changeDetection.markForCheck();
    });

    // Use effect to sync isOpen input with internal state
    effect(() => {
      this._isOpen = this.isOpen();
    });
  }

  ngOnInit(): void {
    const timeout = this.dismissOnTimeout();
    if (timeout) {
      // if dismissOnTimeout used as attr without binding, it will be a string
      setTimeout(
        () => this.close(),
        parseInt(timeout as string, 10)
      );
    }
  }

  // todo: animation ` If the .fade and .in classes are present on the element,
  // the alert will fade out before it is removed`
  /**
   * Closes an alert by removing it from the DOM.
   */
  close(): void {
    if (!this._isOpen) {
      return;
    }

    this.onClose.emit(this);
    this._isOpen = false;
    this.changeDetection.markForCheck();
    this.onClosed.emit(this);
  }
}
