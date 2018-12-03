import { BsDatepickerViewMode } from '../models';

export function canSwitchMode(mode: BsDatepickerViewMode, minMode?: BsDatepickerViewMode): boolean {
  return minMode ? mode >= minMode : true;
}
