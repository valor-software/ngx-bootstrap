import { InjectionToken } from '@angular/core';

export type ToastPositionValue =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top-full-width'
  | 'bottom-full-width';

export interface ToastOptions {
  class?: string;
  positionClass?: ToastPositionValue;
  animated?: boolean;
  autoHideDelay?: number | null;
  removeOnDestroy?: boolean;
  timeOut?: Record<string, number>;
  closeButton?: boolean;
  maxToastAmount?: number | null;
  toastDelay?: number;
  verticalGap?: number;
  preventBodyScroll?: boolean;
}

export const TOASTER_CONFIG_DEFAULT_OVERRIDE = new InjectionToken<ToastOptions>('TOASTER_CONFIG_DEFAULT_OVERRIDE');
