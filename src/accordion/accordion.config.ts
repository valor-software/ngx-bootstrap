import { Injectable } from '@angular/core';

/**
 * Configuration service, provides default values for the AccordionComponent.
 */
@Injectable({
  providedIn: 'root'
})
export class AccordionConfig {
  /** Whether the other panels should be closed when a panel is opened */
  closeOthers: Boolean = false;
  /** turn on/off animation */
  isAnimated: Boolean = false;
}
