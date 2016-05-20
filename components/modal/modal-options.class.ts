export interface ModalOptions {
  /**
   *  Includes a modal-backdrop element. Alternatively, specify static for a backdrop which doesn't close the modal on click.
   */
  backdrop:boolean | 'static';
  /**
   * Closes the modal when escape key is pressed.
   */
  keyboard:boolean;

  focus:boolean;
  /**
   * Shows the modal when initialized.
   */
  show:boolean;
}

export const modalConfig:ModalOptions = {
  backdrop : true,
  keyboard : true,
  focus    : true,
  show     : true
};

export const ClassName:any = {
  SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
  BACKDROP: 'modal-backdrop',
  OPEN: 'modal-open',
  FADE: 'fade',
  IN: 'in'
};

