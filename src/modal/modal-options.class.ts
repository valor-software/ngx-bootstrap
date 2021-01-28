import { Injectable, StaticProvider, InjectionToken } from '@angular/core';
import { ClassName, DismissReasons, Selector, TransitionDurations } from './models';

@Injectable()
export class ModalOptions<T = Object> {
  /**
   *  Allow user to ID for the modal. Otherwise, a unique number will be given
   */
  id?: number;
  /**
   *  Includes a modal-backdrop element. Alternatively,
   *  specify static for a backdrop which doesn't close the modal on click.
   */
  backdrop?: boolean | 'static';
  /**
   * Closes the modal when escape key is pressed.
   */
  keyboard?: boolean;

  focus?: boolean;
  /**
   * Shows the modal when initialized.
   */
  show?: boolean;
  /**
   * Ignore the backdrop click
   */
  ignoreBackdropClick?: boolean;
  /**
   * Css class for opened modal
   */
  class?: string;
  /**
   * Toggle animation
   */
  animated?: boolean;
  /**
   * Modal data
   */
  initialState?: Partial<T>;
  /**
   * Modal providers
   */
  providers?: StaticProvider[];
  /**
   * aria-labelledby attribute value to set on the modal window
   */
  ariaLabelledBy?: string;
  /**
   * aria-describedby attribute value to set on the modal window
   */
  ariaDescribedby?: string;
}

export const modalConfigDefaults: ModalOptions = {
  backdrop: true,
  keyboard: true,
  focus: true,
  show: false,
  ignoreBackdropClick: false,
  class: '',
  animated: true,
  initialState: {}
};

export const MODAL_CONFIG_DEFAULT_OVERRIDE: InjectionToken<ModalOptions> =
  new InjectionToken<ModalOptions>('override-default-config');

export const CLASS_NAME: ClassName = {
  SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
  BACKDROP: 'modal-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  IN: 'in', // bs3
  SHOW: 'show' // bs4
};

export const SELECTOR: Selector = {
  DIALOG: '.modal-dialog',
  DATA_TOGGLE: '[data-toggle="modal"]',
  DATA_DISMISS: '[data-dismiss="modal"]',
  FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
};

export const TRANSITION_DURATIONS: TransitionDurations = {
  MODAL: 300,
  BACKDROP: 150
};

export const DISMISS_REASONS: DismissReasons = {
  BACKRDOP: 'backdrop-click',
  ESC: 'esc',
  BACK: 'browser-back-navigation-clicked'
};
