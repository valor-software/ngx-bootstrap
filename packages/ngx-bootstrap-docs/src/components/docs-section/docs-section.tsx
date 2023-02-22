import {component$, useStore, $, useClientEffect$, Slot, useSignal} from '@builder.io/qwik';
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
    const customId = 'docSectionTabset';
    const activeTab = useSignal<{ tabsetId: string; id: string; active: boolean; }>();

    useClientEffect$(() => {
        const listener = ()=> {
            setTimeout(() => {
                const tab = getQueryParams('tab');
                state.activeTab = tabsNames[tab as keyof typeof tabsNames] || tabsNames.overview;
                setTimeout(() => {
                    activeTab.value = {
                        tabsetId: customId,
                        id: `docs-${state.activeTab}-tab`,
                        active: true
                    }
                }, 200)
            },100)
        }

        if (!state.activeTab) {
            listener();
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
                    <Tabset activeTabIsChanged={onChangeFunc} updateTab={activeTab.value} customId={customId}>
                        <Tab heading="Overview" id={'docs-overview-tab'}
                             customClass={'example-tabset cursor-pointer'}>
                            <Slot name={'overview'}/>
                        </Tab>
                        <Tab heading="API" id={'docs-api-tab'}
                             customClass={'example-tabset cursor-pointer'}>
                            <Slot name={'api'}/>
                        </Tab>
                        <Tab heading="Examples" id={'docs-examples-tab'}
                             customClass={'example-tabset cursor-pointer'}>
                            <Slot name={'examples'}/>
                        </Tab>
                    </Tabset>
                    )}
            </div>
        </div>
    );
});

