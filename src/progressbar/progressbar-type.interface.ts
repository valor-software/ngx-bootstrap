import { BarComponent } from './bar.component';
import { ElementRef, QueryList } from '@angular/core';

export type ProgressbarType = 'success' | 'info' | 'warning' | 'danger';
export interface BarValue {
  type: ProgressbarType;
  label: string;
  value: number;
  max: number;
}

export type IProgressBarComponent = {
  type?: ProgressbarType;
  _value?: number;
  isStacked: boolean;
  _values?: BarValue[];
  _striped?: boolean;
  _animate: boolean;
  _max: number;
  bars: Set<BarComponent>;
  barElements?: QueryList<ElementRef>;
  addBar(value: BarComponent): void;
  removeBar(bar: BarComponent): void;
};
