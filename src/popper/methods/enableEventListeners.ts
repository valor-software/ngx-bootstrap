import { setupEventListeners } from '../utils';

/**
 * It will add resize/scroll events and start recalculating
 * position of the popper element when they are triggered.
 * @method
 * @memberof Popper
 */
export function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(
      this.reference,
      this.options,
      this.state,
      this.scheduleUpdate
    );
  }
}
