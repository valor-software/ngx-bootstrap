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
  options: Options;
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

export interface Options {
  placement?: string;
  modifiers: {
    flip?: {
      enabled: boolean;
    };
    preventOverflow?: {
      enabled: boolean;
    };
  };
  allowedPositions?: string[];
}
