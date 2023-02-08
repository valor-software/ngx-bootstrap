import {component$, useStore, $, useClientEffect$, Slot} from '@builder.io/qwik';
import {Tab, Tabset} from "ngx-bootstrap";
import {useNavigate} from "@builder.io/qwik-city";
import {getQueryParams} from "~/routing/routing";
import { ContentSection } from '~/models/content-section.model';


export enum tabsNames {
    overview = 'overview',
    api = 'api',
    examples = 'examples'
}

export enum tabsNamesIds {
    'tab-overview' = 'overview',
    'tab-api' = 'api',
    'tab-examples' = 'examples'
}

export type IState = {
    activeTab: null | tabsNames
}

export default component$((props: {section: ContentSection[]}) => {
    const state = useStore<IState>({
        activeTab: null
    });

    const navigate = useNavigate();

    useClientEffect$(() => {
        if (!state.activeTab) {
            const tab = getQueryParams('tab');
            state.activeTab = tabsNames[tab as keyof typeof tabsNames] || tabsNames.overview;
        }
    });

    useClientEffect$(() => {
        const listener = ()=> {
            setTimeout(() => {
                const tab = getQueryParams('tab');
                state.activeTab = tabsNames[tab as keyof typeof tabsNames] || tabsNames.overview;
            },100)
        }

        window.addEventListener('locationchange', listener);
        return ()=> {window.removeEventListener('locationchange',listener)}
    })

    const onChangeFunc = $((activeTabId: string) => {
        const urlTab = getQueryParams('tab');
        const key = tabsNamesIds[activeTabId as keyof typeof tabsNamesIds]

        if (key && state.activeTab && state.activeTab.toString() !== key) {
                window.dispatchEvent(new Event('locationchange'));
                navigate.path = `?tab=${key}`;
        }

        if (key && !urlTab) {
            window.dispatchEvent(new Event('locationchange'));
            navigate.path = `?tab=${tabsNames.overview}`;
        }
    })

    return (
        <div class="docs-section">
            <div className="example-tabset-box tabset">
                {!!state.activeTab && (
                    <Tabset onChange={onChangeFunc}>
                        <Tab heading="Overview" id={'tab-overview'} active={state.activeTab === tabsNames.overview}
                             customClass={'example-tabset cursor-pointer'}>
                            <Slot name={'overview'}/>
                        </Tab>
                        <Tab heading="API" id={'tab-api'} active={state.activeTab === tabsNames.api}
                             customClass={'example-tabset cursor-pointer'}>
                            <Slot name={'api'}/>
                        </Tab>
                        <Tab heading="Examples" id={'tab-examples'} active={state.activeTab === tabsNames.examples}
                             customClass={'example-tabset cursor-pointer'}>
                            <Slot name={'examples'}/>
                        </Tab>
                    </Tabset>
                )}
            </div>
        </div>
    );
});

