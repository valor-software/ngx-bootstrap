export interface ModalOptions {
  /**
   *  Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.
   */
  backdrop?:boolean | 'static';
  /**
   * Closes the modal when escape key is pressed.
   */
  keyboard?:boolean;

  focus?:boolean;
  /**
   * Shows the modal when initialized.
   */
  show?:boolean;
  /**
   * Ignore the backdrop click
   */
  ignoreBackdropClick?:boolean;
}

export const modalConfigDefaults:ModalOptions = {
  backdrop: true,
  keyboard: true,
  focus: true,
  show: true,
  ignoreBackdropClick: false
};

export const ClassName:any = {
  SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
  BACKDROP: 'modal-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  IN: 'in'
};

export const Selector:any = {
  DIALOG: '.modal-dialog',
  DATA_TOGGLE: '[data-toggle="modal"]',
  DATA_DISMISS: '[data-dismiss="modal"]',
  FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
};
