export interface ClassName {
  SCROLLBAR_MEASURER: string;
  BACKDROP: string;
  OPEN: string;
  FADE: string;
  IN: string;
  SHOW: string;
}

export interface Selector {
  DIALOG: string;
  DATA_TOGGLE: string;
  DATA_DISMISS: string;
  FIXED_CONTENT: string;
}

export interface TransitionDurations {
  MODAL: number;
  BACKDROP: number;
}

export interface DismissReasons {
  BACKRDOP: string;
  ESC: string;
}

export interface IModalDialogButton {
    text: string;
    cssClass?: string;
    /**
     * Specifies a value that indicates whether the Button is `disabled` or not.
     * @default false.
     */
    disabled?: boolean;
    click?: ModalDialogOnAction;
}

export type ModalDialogOnAction = () => void;
