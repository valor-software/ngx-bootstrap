import { OnInit } from 'angular2/core';
import { Tab } from './tab.directive';
export declare class Tabset implements OnInit {
    private vertical;
    private justified;
    private type;
    private setClassMap();
    tabs: Array<Tab>;
    private isDestroyed;
    private _vertical;
    private _justified;
    private _type;
    private classMap;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    addTab(tab: Tab): void;
    removeTab(tab: Tab): void;
    private getClosestTabIndex(index);
    private hasAvailableTabs(index);
}
