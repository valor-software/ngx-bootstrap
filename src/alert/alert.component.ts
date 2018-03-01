import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { AlertConfig } from './alert.config';
import { OnChange } from '../utils/decorators';

@Component({
  selector: 'alert,bs-alert',
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit {
  /** Alert type.
   * Provides one of four bootstrap supported contextual classes:
   * `success`, `info`, `warning` and `danger`
   */
  @Input() type = 'warning';
  /** If set, displays an inline "Close" button */
  @OnChange()   @Input()   dismissible = false;
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
  dismissibleChange = new EventEmitter<boolean>();

  constructor(_config: AlertConfig, private changeDetection: ChangeDetectorRef) {
    Object.assign(this, _config);
    this.dismissibleChange.subscribe((dismissible: boolean) => {
      this.classes = this.dismissible ? 'alert-dismissible' : '';
      this.changeDetection.markForCheck();
    });
  }

  ngOnInit(): void {
    if (this.dismissOnTimeout) {
      // if dismissOnTimeout used as attr without binding, it will be a string
      setTimeout(
        () => this.close(),
        parseInt(this.dismissOnTimeout as string, 10)
      );
    }
  }

  // todo: animation ` If the .fade and .in classes are present on the element,
  // the alert will fade out before it is removed`
  /**
   * Closes an alert by removing it from the DOM.
   */
  close(): void {
    if (!this.isOpen) {
      return;
    }

    this.onClose.emit(this);
    this.isOpen = false;
    this.changeDetection.markForCheck();
    this.onClosed.emit(this);
  }
}
