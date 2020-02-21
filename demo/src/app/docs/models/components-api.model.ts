import { Injectable } from '@angular/core';

@Injectable()
export class ComponentApi {
  title: string;
  anchor: string;
  outlet: any;
  showMethods?: boolean;
}
