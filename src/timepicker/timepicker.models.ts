export interface TimeUnit {
  hour?: number;
  minute?: number;
  seconds?: number;
}

export interface TimepickerControls {
  canIncrementHours: boolean;
  canIncrementMinutes: boolean;
  canIncrementSeconds: boolean;

  canDecrementHours: boolean;
  canDecrementMinutes: boolean;
  canDecrementSeconds: boolean;
}

export interface TimepickerComponentState {
  value: Date;
  min: Date;
  max: Date;
  hourStep: number;
  minuteStep: number;
  secondsStep: number;
  showSeconds: boolean;
}
