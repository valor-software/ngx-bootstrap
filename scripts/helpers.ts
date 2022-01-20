import { dispatchMouseEvent } from '@ngneat/spectator';

export function fireEvent(target: Node, action: string) {
  dispatchMouseEvent(target, action);
}
