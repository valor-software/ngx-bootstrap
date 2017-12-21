import { BsDatepickerViewMode } from '../models/index';

export function canSwitchMode(mode: BsDatepickerViewMode, minMode?:BsDatepickerViewMode): boolean {
  return minMode ? mode >= minMode : true;
}
