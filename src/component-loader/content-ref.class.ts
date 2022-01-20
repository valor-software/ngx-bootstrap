/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

import { ComponentRef, ViewRef } from '@angular/core';

export class ContentRef {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes: any[];
  viewRef?: ViewRef;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentRef?: ComponentRef<any>;

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodes: any[],
    viewRef?: ViewRef,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    componentRef?: ComponentRef<any>
  ) {
    this.nodes = nodes;
    this.viewRef = viewRef;
    this.componentRef = componentRef;
  }
}
