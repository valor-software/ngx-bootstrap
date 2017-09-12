import { Injectable } from '@angular/core';

/**
 * Configuration service, provides default values for the AccordionComponent.
 */
@Injectable()
export class AccordionConfig {
  /** Whether the other panels should be closed when a panel is opened */
  closeOthers: Boolean = false;
}
