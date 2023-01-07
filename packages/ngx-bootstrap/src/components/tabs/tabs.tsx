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
}


export interface IState {
    _tabs: ITab[];
    classMap: { [key: string]: boolean };
    ariaLabel: string;
    activeTab: ITab;
}

export const TabsContext = createContext<ITab[]>('tabs-context');
export const ActiveTabContext = createContext<ITab>('active-tab-context');
export const ActiveTabIdContext = createContext<any>('active-tab-id-context');

export const Tabset = component$((props: ITabsSetProps) => {
    const state = useStore<IState>({
        _tabs: [],
        classMap: {},
        ariaLabel: 'Tabs',
        // @ts-ignore
        activeTab: {}
    }, {recursive: true});
    let idContext = {
        id: '1234'
    }

    useContextProvider(TabsContext, state._tabs);
    useContextProvider(ActiveTabContext, state.activeTab);
    useContextProvider(ActiveTabIdContext, idContext);

    useTask$(({ track }: { track: Function }) => {
        track(() => state._tabs);
        state._tabs.map(item => {
            if (item.active) {
                state.activeTab = item;
                idContext.id = '456'
            }
        })

        console.log('track active tab', state.activeTab)

    });
    // let tabs = useContext(TabsContext)

    useClientEffect$(() => {

    })

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
                state.activeTab = Object.assign(item);
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
