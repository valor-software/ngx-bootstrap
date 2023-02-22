import {
    component$,
    useStore,
    Slot,
    $,
    createContext,
    useClientEffect$,
    useContextProvider,
    useTask$
} from '@builder.io/qwik';
import type {ITab} from './models';

export interface ITabsSetProps {
    vertical?: boolean;
    justified?: boolean;
    type?: string;
    activeTabIsChanged?: (activeTabId: string) => void;
    customId?: string;
    updateTab?: Partial<IUpdatedTab>;
    updateStore?: {
        tabsetId: string;
    };
    removeTabs?: {
        tabsetId: string;
        tabsIds: string[];
    }
}

export interface IState {
    _tabs: ITab[];
    classMap: { [key: string]: boolean };
    ariaLabel: string;
    tabsCheck: unknown;
    tabsActiveId: string | null;
}

export interface IUpdatedTab extends ITab {
    tabsetId: string;
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
            if (props.activeTabIsChanged) {
                props.activeTabIsChanged(state.tabsActiveId);
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
        if (props.activeTabIsChanged) {
            props.activeTabIsChanged(state.tabsActiveId);
        }
    });

    useClientEffect$(({ track }) => {
        const updateTab = track(() => props.updateTab);
        if (props.customId === props.updateTab?.tabsetId) {
            const index = state._tabs.findIndex(item => item.id === updateTab?.id);
            const obj = Object.assign({}, state._tabs[index]);
            for (let key in obj) {
                //@ts-ignore
                obj[key] = key in props.updateTab ? props.updateTab[key] : state._tabs[index][key];
            }

            if (obj.active && state.tabsActiveId !== obj.id) {
                setActiveTab(obj);
                return;
            }

            state._tabs[index] = Object.assign(obj);
        }
    });

    useClientEffect$(({ track }) => {
        const updateStore = track(() => props.updateStore);
        if (props.customId === updateStore?.tabsetId) {
            state._tabs = [...state._tabs];
        }
    });

    useClientEffect$(({ track }) => {
        const removeStore = track(() => props.removeTabs);
        if (props.customId === removeStore?.tabsetId) {
            state._tabs = state._tabs.filter(tab => !removeStore?.tabsIds.includes(tab.id));
            if (!state._tabs.some(tab => tab.active)) {
                setActiveTab();
            }
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

    const keyNavActions = $((event: any, index: number) => {
        //todo add keyboard implementation
        console.log(event, index)
    });

    return (
        <div data-state-id={state.ariaLabel}>
                        <ul className={`
                            nav ${props.vertical ? 'nav-stacked' : ''} 
                            ${props.justified ? 'nav-justified' : ''} 
                            nav-${props.type || 'tabs'}
                            ${props.vertical ? 'nav-stacked flex-column' : ''}
                        `}
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
                                        {tabz.hasCustomTemplate ? ('') : (<span>{tabz.heading || index}</span>)}
                                        <Slot name={tabz.id}></Slot>
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
