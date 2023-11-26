import { Injectable } from '@angular/core';
import { ComponentExample } from './components-examples.model';
import { ComponentApi } from './components-api.model';
import { SourceCodeModel } from "./source-code.model";

@Injectable({providedIn: 'platform'})
export class ContentSection {
  name?: string;
  anchor?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outlet: any; // @Todo fix type
  description?: string;
  content?: ComponentExample[] | ComponentApi[];
  importInfo?: string;
  tabName?: 'overview' | 'api' | 'examples';
  usage?: SourceCodeModel;
}
