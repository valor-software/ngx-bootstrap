import { dispatchMouseEvent } from '@ngneat/spectator';

export function fireEvent(target, action) {
  dispatchMouseEvent(target, action);
}
