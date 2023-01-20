import {
    component$,
    useStore,
    Slot,
    $,
    createContext,
    useClientEffect$,
    useContext,
    useContextProvider,
    render, useSignal, useTask$
} from '@builder.io/qwik';
import {isBrowser} from "@builder.io/qwik/build";

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
    onChange?: (activeTabId: string) => void
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
        ariaLabel: 'Tabs',
        tabsActiveId: null,
        tabsCheck: {},
    }, {recursive: true});

    useContextProvider(TabsContext, state);

    useTask$(({ track }: { track: Function }) => {
        // Can't track state.tabs here because the pointer to that variable is the same each re-render
        track(() => state.tabsCheck);
        const activeTab = state._tabs.find(item => item.active);
        state.tabsActiveId = activeTab?.id || state._tabs[0]?.id;
        if (props.onChange) {
            props.onChange(state.tabsActiveId);
        }
    });


    const keyNavActions = $((event: any, index: number) => {
        //todo add keyboard implementation
        console.log(event, index)
    });

    const setActiveTab = $((tab: ITab) => {
        const arr: ITab[] = [];
        state._tabs.map(item => arr.push({...item}));
        arr.map(item => {
            item.active = false;
            if (item.id === tab.id) {
                item.active = true;
                state.tabsCheck = {};
            }
        });

        state._tabs = Array.from(arr);
    });

    return (
        <div>
            <ul className={`nav${props.vertical ? ' nav-stacked' : ''}${props.justified ? ' nav-justified' : ''} nav-${props.type || 'tabs'} `}
            aria-label={state.ariaLabel}
            role="tablist">
                {state._tabs.map((tabz: ITab,index: number) => {
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
                            <span>{ tabz.heading || index }</span>
                        </a>
                    </li>
                })}
    </ul>
    <div class="tab-content">
        <Slot></Slot>
    </div>
        </div>
    );
});
