/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
import { ComponentRef, ViewRef } from '@angular/core';
export declare class ContentRef {
    nodes: any[];
    viewRef?: ViewRef;
    componentRef?: ComponentRef<any>;
    constructor(nodes: any[], viewRef?: ViewRef, componentRef?: ComponentRef<any>);
}
