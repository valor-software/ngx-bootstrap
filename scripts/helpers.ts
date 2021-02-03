import { dispatchMouseEvent } from '@netbasal/spectator';

export function fireEvent(target, action) {
  dispatchMouseEvent(target, action);
}
