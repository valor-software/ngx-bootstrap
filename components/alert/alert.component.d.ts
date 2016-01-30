import { OnInit, EventEmitter } from 'angular2/core';
export declare class Alert implements OnInit {
    private type;
    private dismissible;
    private dismissOnTimeout;
    close: EventEmitter<Alert>;
    private closed;
    private classes;
    constructor();
    ngOnInit(): void;
    onClose(): void;
}
