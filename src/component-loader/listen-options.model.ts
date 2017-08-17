export interface ListenOptions {
  target?: HTMLElement;
  targets?: HTMLElement[];
  triggers?: string;
  outsideClick?: boolean;
  show?: Function;
  hide?: Function;
  toggle?: Function;
}
