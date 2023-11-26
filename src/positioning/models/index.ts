/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
export interface Offsets {
  width: number;
  height: number;
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
  marginTop?: number;
  marginLeft?: number;
}

export interface Data {
  options: Options;
  instance: {
    target: HTMLElement;
    host: HTMLElement;
    arrow?: HTMLElement;
  };
  offsets: {
    target: Offsets;
    host: Offsets;
    arrow?: Record<string, string | number | HTMLElement>;
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
      boundariesElement?: string;
    };
  };
  allowedPositions?: string[];
}

export enum MapPlacementInToRL {
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right',
  auto = 'auto',
  end = 'right',
  start = 'left',
  'top left' = 'top left',
  'top right' = 'top right',
  'right top' = 'right top',
  'right bottom' = 'right bottom',
  'bottom right' = 'bottom right',
  'bottom left' = 'bottom left',
  'left bottom' = 'left bottom',
  'left top' = 'left top',
  'top start' = 'top left',
  'top end' = 'top right',
  'end top' = 'right top',
  'end bottom' = 'right bottom',
  'bottom end' = 'bottom right',
  'bottom start' = 'bottom left',
  'start bottom' = 'start bottom',
  'start top' = 'left top'
}

export enum PlacementForBs5 {
  top = 'top',
  bottom = 'bottom',
  left = 'start',
  right = 'end',
  auto = 'auto',
  end = 'end',
  start = 'start',
  'top left' = 'top start',
  'top right' = 'top end',
  'right top' = 'end top',
  'right bottom' = 'end bottom',
  'bottom right' = 'bottom end',
  'bottom left' = 'bottom start',
  'left bottom' = 'start bottom',
  'left top' = 'start top',
  'top start' = 'top start',
  'top end' = 'top end',
  'end top' = 'end top',
  'end bottom' = 'end bottom',
  'bottom end' = 'bottom end',
  'bottom start' = 'bottom start',
  'start bottom' = 'start bottom',
  'start top' = 'start top'
}

type VerticalPosition = 'top' | 'bottom';
type HorizontalPosition = 'left' | 'right';
type RtlFriendlyHorizontalPosition = 'start' | 'end';

export type AvailableBSPositions =
  | VerticalPosition
  | HorizontalPosition
  | RtlFriendlyHorizontalPosition
  | 'auto'
  | `${VerticalPosition} ${HorizontalPosition}`
  | `${HorizontalPosition} ${VerticalPosition}`
  | `${VerticalPosition} ${RtlFriendlyHorizontalPosition}`
  | `${RtlFriendlyHorizontalPosition} ${VerticalPosition}`;

/** @deprecated use AvailablePositions */
export type AvailbleBSPositions = AvailableBSPositions;
