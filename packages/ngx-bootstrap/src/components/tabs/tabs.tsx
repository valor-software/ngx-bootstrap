import {component$, useStore, Slot, $, createContext, useClientEffect$, useContext, useContextProvider} from '@builder.io/qwik';

export interface ITab {
    heading?: string;
    id?: string;
    disabled?: boolean;
    removable?: boolean;
    customClass?: string;
    active?: boolean;
}

export interface ITabsSetProps {
    vertical?: boolean;
    justified?: boolean;
    type?: string;
}


export interface IState {
    tabs: ITab[];
    classMap: { [key: string]: boolean };
    ariaLabel: string;
}

export const TabsContext = createContext<ITab[]>('tabs-context');
export const TabsArrayContext = createContext<ITab[]>('tabs-array-context');

export const Tabset = component$((props: ITabsSetProps) => {
    const state = useStore<IState>({
        tabs: [],
        classMap: {},
        ariaLabel: 'Tabs'
    }, {recursive: true});

    useContextProvider(TabsContext, state.tabs);
    // const tabsArr = useContext(TabsContext);


    useClientEffect$(() => {
        console.log('tabsSet', state.tabs)
    })

    const keyNavActions = $((event: any, index: number) => {
        //todo add keyboard implementation
        console.log(event, index)
    });

    const setActiveTab = $((tab: ITab) => {
        const arr = JSON.parse(JSON.stringify(state.tabs));
        // arr.map((item) => item.active = false);
        arr.forEach((item: ITab) => {
            item.active = false;

            if (item === tab) {
                item.active = true;
                console.log('there', item)
            }

        });
        state.tabs = arr;
        console.log(arr);
    });

    return (
        <div>
            <ul className={`nav ${props.vertical ? 'nav-stacked' : ''} ${props.justified ? 'nav-justified' : ''} nav-${props.type || 'tabs'} `}
            aria-label={state.ariaLabel}
            role="tablist">
                {state.tabs.map((tabz: ITab,index: number) => {
                    return <li className={`
                    ${tabz.active ? 'active' : ''} nav-item 
                    ${tabz.customClass || ''}
                    ${tabz.disabled ? 'disabled' : ''}
                    `}
                    onKeyDown$={(event) => keyNavActions(event, index)}
                    >
                        <a className={`nav-link ${tabz.active ? 'active' : ''} ${tabz.disabled ? 'disabled' : ''}`}
                           role="tab"
                           aria-controls={tabz.id ? tabz.id : `tab-id-${index}`}
                           aria-selected={!!tabz.active}
                           id={tabz.id ? tabz.id + '-link' : `tab-id-${index}`}
                           onClick$={() => setActiveTab(tabz)}
                        >
                            <span>{ tabz.heading || index }</span>
                        </a>
                    </li>
                })}
{/*            <li *ngFor="let tabz of tabs; let i = index" [ngClass]="['nav-item', tabz.customClass || '']"*/}
{/*            [class.active]="tabz.active" [class.disabled]="tabz.disabled" (keydown)="keyNavActions($event, i)">*/}
{/*            <a href="javascript:void(0);" class="nav-link" role="tab"*/}
{/*            [attr.aria-controls]="tabz.id ? tabz.id : ''"*/}
{/*            [attr.aria-selected]="!!tabz.active"*/}
{/*            [attr.id]="tabz.id ? tabz.id + '-link' : ''"*/}
{/*            [class.active]="tabz.active" [class.disabled]="tabz.disabled"*/}
{/*            (click)="tabz.active = true">*/}
{/*            <span [ngTransclude]="tabz.headingRef">{{ tabz.heading }}</span>*/}
{/*    <span *ngIf="tabz.removable" (click)="$event.preventDefault(); removeTab(tabz);" class="bs-remove-tab"> &#10060;</span>*/}
{/*</a>*/}
{/*</li>*/}
</ul>
    <div class="tab-content">
        <Slot></Slot>
    </div>
        </div>
    );
});
