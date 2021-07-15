export type ProgressbarType = 'success' | 'info' | 'warning' | 'danger';

export interface BarValue {
  type: ProgressbarType;
  label: string;
  value: number;
  max: number;
}
