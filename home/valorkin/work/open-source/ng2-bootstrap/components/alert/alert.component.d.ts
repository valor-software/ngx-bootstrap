import { OnInit, EventEmitter } from 'angular2/core';
export declare class Alert implements OnInit {
    type: string;
    dismissible: boolean;
    dismissOnTimeout: number;
    close: EventEmitter<Alert>;
    private closed;
    private classes;
    constructor();
    ngOnInit(): any;
    onClose(): void;
}
