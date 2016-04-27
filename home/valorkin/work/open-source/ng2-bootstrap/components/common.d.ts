import { ViewContainerRef } from 'angular2/core';
export interface KeyAttribute {
    [key: string]: any;
}
export declare class NgTranscludeDirective {
    viewRef: ViewContainerRef;
    private _ngTransclude;
    private ngTransclude;
    constructor(_viewRef: ViewContainerRef);
}
