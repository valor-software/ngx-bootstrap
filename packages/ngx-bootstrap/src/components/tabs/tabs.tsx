import {
    component$,
    useStore,
    Slot,
    $,
    createContext,
    useClientEffect$,
    useContext,
    useContextProvider,
    render, useSignal, useTask$, useOnWindow, useOn, useOnDocument
} from '@builder.io/qwik';
import {isBrowser} from "@builder.io/qwik/build";
import { TabsetCustomEvent } from './models';

/**
 * Custom events
 * updateTab => tabsId, ITab obj with id
 * removeTab => tabsId, ITab obj with id
 * addTab => tabsId, ITab obj with id
 * */

export interface ITab {
    heading?: string;
    id: string;
    disabled?: boolean;
    removable?: boolean;
    customClass?: string;
    active?: boolean;
}

export interface ITabsSetProps {
    vertical?: boolean;
    justified?: boolean;
    type?: string;
    onChange?: (activeTabId: string) => void;
    customId?: string;
}

export interface IState {
    _tabs: ITab[];
    classMap: { [key: string]: boolean };
    ariaLabel: string;
    tabsCheck: unknown;
    tabsActiveId: string | null;
}

export const TabsContext = createContext<IState>('tabs-context');

export const Tabset = component$((props: ITabsSetProps) => {
    const state = useStore<IState>({
        _tabs: [],
        classMap: {},
        ariaLabel: '',
        tabsActiveId: null,
        tabsCheck: {},
    }, {recursive: true});

    useContextProvider(TabsContext, state);

    const setActiveTab = $((tab?: ITab) => {
        if (!state._tabs.length) {
            return;
        }

        if (!tab) {
            const tabObj = Object.assign({}, state._tabs[0]);
            tabObj.active = true;
            state._tabs[0] = tabObj;
            state.tabsActiveId = state._tabs[0]?.id;
            if (props.onChange) {
                props.onChange(state.tabsActiveId);
            }

            return
        }

        let arr: ITab[] = [...state._tabs];
        arr.map(item => {
            item.active = false;
            if (item.id === tab.id) {
                item.active = true;
            }
        });
        state.tabsActiveId = tab.id;
        state._tabs = Array.from(arr);
        if (props.onChange) {
            props.onChange(state.tabsActiveId);
        }
    });

    const removeTab = $((tabId: string) => {
        state._tabs = state._tabs.filter(item => item.id !== tabId);
        state.tabsCheck = {};
    })

    useTask$(({ track }: { track: Function }) => {
        // Can't track state.tabs here because the pointer to that variable is the same each re-render
        track(() => state.tabsCheck);
        if (!state.ariaLabel) {
            const ranDom = Math.random();
            state.ariaLabel = new Date().getTime().toString() + ranDom;
        }
        const activeTab = state._tabs.find(item => item.active);
        setActiveTab(activeTab);
    });

    useOnWindow(
        'updateTabBs',
        $((ev: Event) => {
            if (!props.customId || props.customId === (ev as CustomEvent).detail?.tabsetId) {
                const index = state._tabs.findIndex(item => item.id === (ev as CustomEvent).detail?.tab.id) || 0;
                const obj = Object.assign({}, state._tabs[index]);
                for (let key in obj) {
                    // @ts-ignore
                    obj[key] = key in Object((ev as CustomEvent).detail?.tab) ? (ev as CustomEvent).detail?.tab[key] : state._tabs[index][key];
                }

                state._tabs[index] = Object.assign(obj);
                if (obj.active) {
                    setActiveTab(obj);
                }
            }
        })
    );

    useOnWindow(
        'removeTabBs',
        $((ev: Event) => {
            if (!props.customId || props.customId === (ev as CustomEvent).detail?.tabsetId) {
                const ids: string[] = [];
                (ev as CustomEvent).detail?.tabs.map((item: ITab) => {
                    ids.push(item.id);
                })
                state._tabs = state._tabs.filter(tab => !ids.includes(tab.id));
                if (!state._tabs.some(tab => tab.active)) {
                    setActiveTab();
                }
            }
        })
    );

    useOnWindow(
        'addTabBs',
        $((ev: Event) => {
            if (!props.customId || props.customId === (ev as CustomEvent).detail?.tabsetId) {
                state._tabs = [...state._tabs];
                console.log(state._tabs)
            }
        })
);

    const keyNavActions = $((event: any, index: number) => {
        //todo add keyboard implementation
        console.log(event, index)
    });

    return (
        <div data-state-id={state.ariaLabel}>
                        <ul className={`nav${props.vertical ? ' nav-stacked' : ''}${props.justified ? ' nav-justified' : ''} nav-${props.type || 'tabs'} `}
                            aria-label={state.ariaLabel}
                            role="tablist" id={props.customId}>
                            {state._tabs.map((tabz: ITab, index: number) => {
                                return <li className={`
                    ${tabz.active ? 'active' : ''} nav-item 
                    ${tabz.customClass || ''}
                    ${tabz.disabled ? 'disabled' : ''}
                    `}
                                           onKeyDown$={(event) => keyNavActions(event, index)}
                                >
                                    <a className={`nav-link ${tabz.active ? 'active' : ''} ${tabz.disabled ? 'disabled' : ''}`}
                                       role="tab"
                                       aria-controls={tabz.id}
                                       aria-selected={!!tabz.active}
                                       id={tabz.id}
                                       onClick$={() =>
                                           setActiveTab(tabz)
                                       }
                                    >
                                        <span>{tabz.heading || index} {tabz.removable?.toString()}</span>
                                        {tabz.removable ?
                                            (
                                                <span class="bs-remove-tab" onClick$={() => {removeTab(tabz.id)}}>&#10060;</span>
                                            ): ''}
                                </a>
                                </li>
                            })}
                        </ul>
                        <div className="tab-content">
                            <Slot></Slot>
                        </div>
                    </div>
    );
});
