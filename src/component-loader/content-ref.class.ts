/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

import { ComponentRef, ViewRef } from '@angular/core';

export class ContentRef {
  /* tslint:disable-next-line: no-any */
  nodes: any[];
  viewRef?: ViewRef;
  /* tslint:disable-next-line: no-any */
  componentRef?: ComponentRef<any>;

  constructor(
    /* tslint:disable-next-line: no-any */
    nodes: any[],
    viewRef?: ViewRef,
    /* tslint:disable-next-line: no-any */
    componentRef?: ComponentRef<any>
  ) {
    this.nodes = nodes;
    this.viewRef = viewRef;
    this.componentRef = componentRef;
  }
}
