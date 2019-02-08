export interface Offsets {
  bottom?: number;
  height: number;
  left?: number;
  right?: number;
  top?: number;
  width: number;
  marginTop?: number;
  marginLeft?: number;
}

export interface Data {
  instance: {
    target: HTMLElement;
    host: HTMLElement;
    arrow: HTMLElement;
  };
  offsets: {
    target: Offsets;
    host: Offsets;
    arrow: { [key: string]: string | number | HTMLElement };
  };
  positionFixed: boolean;
  placement: string;
  placementAuto: boolean;
}
