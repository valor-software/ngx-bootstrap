import { ViewContainerRef } from 'angular2/core';
export interface IAttribute {
    [key: string]: any;
}
export declare class NgTransclude {
    viewRef: ViewContainerRef;
    private _ngTransclude;
    private ngTransclude;
    constructor(_viewRef: ViewContainerRef);
}
