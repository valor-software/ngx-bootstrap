import { Injectable, signal, WritableSignal } from '@angular/core';

/**
 * Configuration service, provides default values for the AccordionComponent.
 */
@Injectable({
  providedIn: 'root'
})
export class AccordionConfig {
  /** Whether the other panels should be closed when a panel is opened */
  closeOthers: WritableSignal<boolean> = signal(false);
  /** turn on/off animation */
  isAnimated: WritableSignal<boolean> = signal(false);
}
