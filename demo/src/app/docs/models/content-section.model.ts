import { Injectable } from '@angular/core';
import { ComponentExample } from './components-examples.model';
import { ComponentApi } from './components-api.model';
import { ComponentsTopSection } from './components-top-section.model';

@Injectable()
export class ContentSection {
  name: string;
  anchor: string;
  outlet: any;
  description?: string;
  content: ComponentExample[] | ComponentApi[] | ComponentsTopSection;
}
