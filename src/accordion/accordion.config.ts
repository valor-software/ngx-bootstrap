import { Injectable } from '@angular/core';

/**
 * Configuration service, provides default values for the AccordionComponent.
 */
@Injectable({
  providedIn: 'root'
})
export class AccordionConfig {
  /** Whether the other panels should be closed when a panel is opened */
  closeOthers = false;
  /** turn on/off animation */
  isAnimated = false;
}
