import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'platform' })
export class ComponentApi {
  title?: string;
  anchor?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  outlet: any; // @Todo fix type
  showMethods?: boolean;
}
