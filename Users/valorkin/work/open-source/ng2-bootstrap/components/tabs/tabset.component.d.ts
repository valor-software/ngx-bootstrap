import { OnInit, OnDestroy } from '@angular/core';
import { TabDirective } from './tab.directive';
export declare class TabsetComponent implements OnInit, OnDestroy {
    vertical: boolean;
    justified: boolean;
    type: string;
    protected clazz: boolean;
    tabs: Array<TabDirective>;
    private isDestroyed;
    private _vertical;
    private _justified;
    private _type;
    private classMap;
    ngOnInit(): void;
    ngOnDestroy(): void;
    addTab(tab: TabDirective): void;
    removeTab(tab: TabDirective): void;
    private getClosestTabIndex(index);
    private hasAvailableTabs(index);
    private setClassMap();
}
