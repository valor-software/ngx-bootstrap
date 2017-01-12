import { EventEmitter, OnInit } from '@angular/core';
import { AlertConfig } from './alert.config';
export declare class AlertComponent implements OnInit {
    /** Alert type. Provides one of four bootstrap supported contextual classes: `success`, `info`, `warning` and `danger` */
    type: string;
    /** If set, displays an inline "Close" button */
    dismissible: boolean;
    /** Number in milliseconds, after which alert will be closed */
    dismissOnTimeout: number | string;
    isClosed: boolean;
    /** This event fires immediately after close instance method is called, $event is an instance of Alert component. */
    onClose: EventEmitter<AlertComponent>;
    /** This event fires when alert closed, $event is an instance of Alert component */
    onClosed: EventEmitter<AlertComponent>;
    protected classes: string[];
    constructor(_config: AlertConfig);
    ngOnInit(): void;
    /**
     * Closes an alert by removing it from the DOM.
     */
    close(): void;
}
