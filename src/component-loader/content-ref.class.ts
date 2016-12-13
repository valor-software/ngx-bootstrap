/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */

import { ComponentRef, ViewRef } from '@angular/core';

export class ContentRef {
  public nodes: any[];
  public viewRef?: ViewRef;
  public componentRef?: ComponentRef<any>;

  public constructor( nodes: any[],  viewRef?: ViewRef,  componentRef?: ComponentRef<any>) {
    this.nodes = nodes;
    this.viewRef = viewRef;
    this.componentRef = componentRef;
  }
}
