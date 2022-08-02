import { getBsVer } from 'ngx-bootstrap/utils';
import { AvailbleBSPositions } from '../models';

const availablePositions = {
  top: ['top', 'top start', 'top end'],
  bottom: ['bottom', 'bottom start', 'bottom end'],
  start: ['start', 'start top', 'start bottom'],
  end: ['end', 'end top', 'end bottom']
};

export function checkPopoverMargin(placement: AvailbleBSPositions, checkPosition: 'top' | 'bottom' | 'start' | 'end'): boolean {
  if (!getBsVer().isBs5) {
    return false;
  }

  return availablePositions[checkPosition].includes(placement);
}

export function checkMargins(placement: any): string {
  if (!getBsVer().isBs5) {
    return '';
  }

  if (checkPopoverMargin(placement, 'end')) {
    return 'ms-2';
  }

  if (checkPopoverMargin(placement, 'start')) {
    return 'me-2';
  }

  if (checkPopoverMargin(placement, 'top')) {
    return 'mb-2';
  }

  if (checkPopoverMargin(placement, 'bottom')) {
    return 'mt-2';
  }

  return '';
}
