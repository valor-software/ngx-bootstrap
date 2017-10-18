import { Injectable } from '@angular/core';
import { ComponentExample } from './components-examples.model';
import { ComponentApi } from './components-api.model';

@Injectable()
export class ContentSection {
  name: string;
  outlet: any;
  content: Object | ComponentExample[] | ComponentApi[];
}
