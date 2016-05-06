import { OnInit, EventEmitter } from '@angular/core';
export declare class AlertComponent implements OnInit {
    type: string;
    dismissible: boolean;
    dismissOnTimeout: number;
    close: EventEmitter<AlertComponent>;
    private closed;
    private classes;
    ngOnInit(): any;
    onClose(): void;
}
